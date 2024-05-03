@echo off
rem Abrir o arquivo HTML específico
start "" "./public/index.html"

rem Instalar as dependências do projeto
call install.bat

rem Executar o arquivo JavaScript com o Node.js
node index.js