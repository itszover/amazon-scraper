@ECHO OFF

REM install the dependencies
CALL npm install

REM open the browser
START "" "public/index.html"

REM starts the server
CALL node server.js