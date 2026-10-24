import {spawn} from 'node:child_process';
export class StudioClient {
constructor(command,args,timeout=90000){this.command=command;this.args=args;this.timeout=timeout;this.id=1;this.pending=new Map();this.child=null;this.ready=false;this.buf=''}
send(msg){if(!this.child?.stdin.writable)throw Error('Local MCP process not running');this.child.stdin.write(JSON.stringify(msg)+'\n')}
request(method,params={}){const id=this.id++;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{this.pending.delete(id);reject(Error('MCP timeout: '+method))},this.timeout);this.pending.set(id,{resolve,reject,timer});try{this.send({jsonrpc:'2.0',id,method,params})}catch(e){clearTimeout(timer);this.pending.delete(id);reject(e)}})}
fail(error){for(const [id,p] of this.pending){clearTimeout(p.timer);p.reject(error);this.pending.delete(id)}}
async connect(){
if(this.child&&this.ready)return;
if(this.child)this.child.kill();
const child=spawn(this.command,this.args,{windowsHide:true,stdio:['pipe','pipe','pipe']});this.child=child;this.ready=false;this.buf='';
child.stdout.setEncoding('utf8');
child.stdout.on('data',chunk=>{this.buf+=chunk;if(this.buf.length>24e6){this.fail(Error('Oversized MCP output'));child.kill();return}let i;while((i=this.buf.indexOf('\n'))>=0){const line=this.buf.slice(0,i).trim();this.buf=this.buf.slice(i+1);if(!line)continue;let v;try{v=JSON.parse(line)}catch{continue}if(v.id!==undefined&&(v.result!==undefined||v.error!==undefined)){const p=this.pending.get(v.id);if(p){clearTimeout(p.timer);this.pending.delete(v.id);v.error?p.reject(Error(v.error.message)):p.resolve(v.result)}}else if(v.method&&v.id!==undefined)this.send({jsonrpc:'2.0',id:v.id,error:{code:-32601,message:'Not supported'}})}});
child.stderr.on('data',x=>process.stderr.write('[Studio] '+String(x).slice(0,1000)));
child.on('error',e=>this.fail(e));child.on('exit',()=>{this.child=null;this.ready=false;this.fail(Error('Studio MCP process exited'))});
try{const v=await this.request('initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'chatgpt-roblox-runner',version:'0.1.0'}});if(!v?.serverInfo)throw Error('MCP initialization failed');this.send({jsonrpc:'2.0',method:'notifications/initialized'});this.ready=true}catch(e){child.kill();throw e}
}
async list(){await this.connect();const v=await this.request('tools/list');if(!Array.isArray(v?.tools))throw Error('Invalid MCP tools list');return v.tools}
async call(name,args){await this.connect();return this.request('tools/call',{name,arguments:args})}
close(){this.child?.kill()}
}
