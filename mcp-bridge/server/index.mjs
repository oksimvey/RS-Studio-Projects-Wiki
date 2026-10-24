import http from 'node:http';
import { randomUUID, timingSafeEqual } from 'node:crypto';
const tools=[
{name:'studio_status',description:'Check whether the Windows Roblox Studio runner is online.',inputSchema:{type:'object',properties:{},additionalProperties:false}},
{name:'studio_list_tools',description:'Discover the actual MCP tools and JSON schemas currently available inside Roblox Studio. Call before studio_call_tool.',inputSchema:{type:'object',properties:{},additionalProperties:false}},
{name:'studio_call_tool',description:'Invoke a tool from studio_list_tools in the currently open Roblox Studio. Use its exact JSON schema. Local runner must opt into modifying tools.',inputSchema:{type:'object',required:['tool_name','arguments'],properties:{tool_name:{type:'string'},arguments:{type:'object'}},additionalProperties:false}}
];
const eq=(a,b)=>{if(typeof a!=='string'||typeof b!=='string')return false;const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)};
const auth=req=>(req.headers.authorization||'').replace(/^Bearer /,'');
const send=(res,code,data)=>{res.writeHead(code,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify(data))};
const ok=(id,result)=>({jsonrpc:'2.0',id,result});
const err=(id,code,message)=>({jsonrpc:'2.0',id:id??null,error:{code,message}});
const txt=x=>({content:[{type:'text',text:JSON.stringify(x)}]});
async function read(req){let n=0,ch=[];for await(const c of req){n+=c.length;if(n>1_048_576)throw Error('Body too large');ch.push(c)}return JSON.parse(Buffer.concat(ch).toString())}
export function createBridgeServer({chatKey,runnerKey,pollMs=15000,timeoutMs=85000}){
if(!chatKey||!runnerKey||chatKey.length<32||runnerKey.length<32||eq(chatKey,runnerKey))throw Error('Set distinct 32+ character CHAT_API_KEY and RUNNER_API_KEY');
let last=0,wait=null;const queue=[],pending=new Map(),online=()=>Date.now()-last<pollMs*2+3000;
const dispatch=()=>{if(!wait||!queue.length)return;const {res,timer}=wait;wait=null;clearTimeout(timer);send(res,200,queue.shift())};
function job(method,params={}){return new Promise((resolve,reject)=>{if(!online())return reject(Error('Runner offline; launch Windows runner and open Studio'));if(pending.size>=32)return reject(Error('Queue full'));const id=randomUUID(),timer=setTimeout(()=>{pending.delete(id);const i=queue.findIndex(x=>x.id===id);if(i>=0)queue.splice(i,1);reject(Error('Tool timed out'))},timeoutMs);pending.set(id,{resolve,reject,timer});queue.push({id,method,params});dispatch()})}
const app=http.createServer(async(req,res)=>{try{
const path=new URL(req.url,'http://localhost').pathname;
if(path==='/health'&&req.method==='GET')return send(res,200,{ok:true,runnerConnected:online(),queued:queue.length});
if(path==='/runner/poll'||path==='/runner/result'){
if(!eq(auth(req),runnerKey))return send(res,401,{error:'Unauthorized'});last=Date.now();
if(path==='/runner/poll'&&req.method==='GET'){if(wait)return send(res,409,{error:'Runner already polling'});if(queue.length)return send(res,200,queue.shift());const timer=setTimeout(()=>{if(wait?.res===res){wait=null;res.writeHead(204);res.end()}},pollMs);wait={res,timer};res.on('close',()=>{if(wait?.res===res){clearTimeout(timer);wait=null}});return}
if(path==='/runner/result'&&req.method==='POST'){const data=await read(req),p=pending.get(data.id);if(!p)return send(res,404,{error:'Expired job'});pending.delete(data.id);clearTimeout(p.timer);data.ok===true?p.resolve(data.value):p.reject(Error(String(data.error||'Runner error').slice(0,2000)));return send(res,200,{accepted:true})}
return send(res,405,{error:'Method not allowed'});
}
if(path!=='/mcp')return send(res,404,{error:'Not found'});
if(!eq(auth(req),chatKey))return send(res,401,{error:'Unauthorized'});
if(req.method!=='POST')return send(res,405,{error:'POST required'});
let r;try{r=await read(req)}catch{return send(res,400,err(null,-32700,'Invalid JSON'))}
if(!r||r.jsonrpc!=='2.0'||typeof r.method!=='string'||Array.isArray(r))return send(res,400,err(r?.id,-32600,'Invalid request'));
if(r.id===undefined){res.writeHead(202);res.end();return}
const id=r.id;
if(r.method==='initialize')return send(res,200,ok(id,{protocolVersion:['2025-06-18','2025-03-26'].includes(r.params?.protocolVersion)?r.params.protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'roblox-studio-mcp-bridge',version:'0.1.0'}}));
if(r.method==='ping')return send(res,200,ok(id,{}));
if(r.method==='tools/list')return send(res,200,ok(id,{tools}));
if(r.method!=='tools/call')return send(res,200,err(id,-32601,'Method not found'));
try{const name=r.params?.name,a=r.params?.arguments||{};
if(name==='studio_status')return send(res,200,ok(id,txt({runnerConnected:online(),queued:queue.length})));
if(name==='studio_list_tools')return send(res,200,ok(id,txt(await job('list_tools'))));
if(name==='studio_call_tool'){if(typeof a.tool_name!=='string'||!a.tool_name||!a.arguments||typeof a.arguments!=='object'||Array.isArray(a.arguments))return send(res,200,err(id,-32602,'tool_name and arguments required'));const v=await job('call_tool',{name:a.tool_name,arguments:a.arguments});return send(res,200,ok(id,Array.isArray(v?.content)?v:txt(v)))}
return send(res,200,err(id,-32602,'Unknown tool'));
}catch(e){return send(res,200,ok(id,{content:[{type:'text',text:String(e.message||e)}],isError:true}))}
}catch{send(res,500,{error:'Internal server error'})}});
function stop(){if(wait){clearTimeout(wait.timer);wait.res.end();wait=null}for(const [id,p] of pending){clearTimeout(p.timer);p.reject(Error('Gateway stopped'));pending.delete(id)}app.close()}
return {server:app,stop};
}
if(process.argv[1]&&import.meta.url===new URL('file://'+process.argv[1]).href){const {server}=createBridgeServer({chatKey:process.env.CHAT_API_KEY,runnerKey:process.env.RUNNER_API_KEY});const port=Number(process.env.PORT||10000);server.listen(port,'0.0.0.0',()=>console.log('Roblox Studio MCP bridge port',port))}
