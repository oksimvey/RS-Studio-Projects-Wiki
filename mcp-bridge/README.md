# ChatGPT ↔ Roblox Studio MCP bridge

A remote Node gateway on Render relays MCP calls to a local Windows runner that launches Roblox Studio's **official native MCP** process. This does not require ChatGPT Work or Codex at runtime, but requires ChatGPT to allow the installed plugin to invoke tools from normal chats.

## Start the Render server
Render web service (Node) from this repository at branch `feat/chatgpt-roblox-mcp-bridge`:
- Build command: `cd mcp-bridge && npm install`
- Start command: `cd mcp-bridge && npm start`
- Environment secrets: **CHAT_API_KEY** and **RUNNER_API_KEY**, separate random values 32+ characters each. Never check them into Git.
- Public endpoint: `https://YOUR-RENDER-URL/mcp`.
- `GET /health` returns runner state, without exposing keys.
- The queue is in process memory; use one instance. Restarts may discard unfinished calls.

## Start Windows runner
- Install Node.js 22+ and update Roblox Studio.
- Enable **Studio as MCP server** in Assistant → Manage MCP Servers.
- Copy `mcp-bridge/.env.example` to `mcp-bridge/.env` and set gateway URL and exactly the Render **RUNNER_API_KEY** (do NOT put CHAT_API_KEY locally).
- Run `mcp-bridge/runner/start-windows.cmd` with Roblox Studio open.
- Default is safe read-only. Set `ALLOW_MUTATIONS=true` to allow modification, Luau execution, and playtesting.

## Connect in ChatGPT
Install the private ChatGPT plugin configured to `/mcp`. It uses an **API key as a Bearer token**; enter the Render CHAT_API_KEY through the host's credential prompt, not the plugin files.

The plugin exposes `studio_status`, `studio_list_tools`, `studio_call_tool`. The live native MCP tools may change: always discover the tool schemas before calling. For several Studio instances, discover and use `studio_id`.

Auth: keys protect MCP and runner separately. Rotating either requires updating its clients. Avoid exposing your computer directly to the internet. No arbitrary shell command RPC is implemented. Only your configured Studio MCP process is spawned.

Limitations: The gateway is a basic single-user bridge and not multi-tenant/OAuth. The ChatGPT Plus UI decides whether tools can run in ordinary chats; plugin creation alone does not guarantee compatibility.
