@echo off
cd /d "%~dp0.."
node --env-file=.env runner/index.mjs
pause
