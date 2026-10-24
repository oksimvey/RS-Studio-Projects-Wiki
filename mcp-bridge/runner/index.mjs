import {StudioClient} from './studio-client.mjs';
const url=(process.env.GATEWAY_URL||'').replace(/\/$/,''),key=process.env.RUNNER_API_KEY||'';
if(!/^https:\/\//.test(url)&&!/^http:\/\/localhost(:\d+)?$/.test(url))throw Error('GATEWAY_URL must use HTTPS');
if(key.length<32)throw Error('RUNNER_API_KEY requires 32+ characters');
const cmd=process.env.MCP_COMMAND||'cmd.exe',args=JSON.parse(process.env.MCP_ARGS_JSON||'["/c","%LOCALAPPDATA%\\\\Roblox\\\\mcp.bat"]');
if(!Array.isArray(args)||!args.every(x=>typeof x==='string'))throw Error('Invalid MCP_ARGS_JSON');
const client=new StudioClient(cmd,args),allow=process.env.ALLOW_MUTATIONS==='true';
const readonly=new Set(['list_roblox_studios','script_read','script_search','script_grep','search_game_tree','inspect_instance','get_studio_state','get_console_output','screen_capture','search_asset','wait_job_finished']);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function api(path,method='GET',payload){const r=await fetch(url+path,{method,headers:{Authorization:'Bearer '+key,...(payload?{'content-type':'application/json'}:{})},body:payload?JSON.stringify(payload):undefined,signal:AbortSignal.timeout(26000)});if(r.status===204)return null;if(!r.ok)throw Error(path+' HTTP '+r.status);return r.json()}
async function execute(j){
if(j.method==='list_tools')return client.list();
if(j.method!=='call_tool')throw Error('Unknown job');
const {name,arguments:args}=j.params||{};
if(typeof name!=='string'||!args||typeof args!=='object'||Array.isArray(args))throw Error('Invalid tool call');
if(!allow&&!readonly.has(name))throw Error('Read-only runner: set ALLOW_MUTATIONS=true locally to enable writes');
const list=await client.list();if(!list.some(t=>t.name===name))throw Error('Tool not found in connected Studio: '+name);
return client.call(name,args);
}
let stop=false;process.on('SIGINT',()=>{stop=true;client.close()});process.on('SIGTERM',()=>{stop=true;client.close()});
console.log('Roblox Studio runner: modifications '+(allow?'ENABLED':'disabled'));
while(!stop){try{const j=await api('/runner/poll');if(!j)continue;let out;try{out={id:j.id,ok:true,value:await execute(j)}}catch(e){out={id:j.id,ok:false,error:String(e.message||e).slice(0,1500)}}await api('/runner/result','POST',out)}catch(e){if(!stop){console.error('Connection:',e.message);await sleep(3000)}}}
