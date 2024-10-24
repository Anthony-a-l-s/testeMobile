Este projeto é um aplicativo mobile desenvolvido em React Native utilizando Expo e TypeScript, com o objetivo de permitir a pesquisa e visualização de funcionários. 
Ele também integra com uma API para buscar informações de funcionários com base em diferentes critérios, como nome, cargo e telefone.

Funcionalidades:
Lista de Funcionários: Exibe uma lista de funcionários com foto e nome.
Pesquisa em Tempo Real: Permite pesquisar funcionários pela barra de busca, realizando chamadas de API com debounce para melhorar a performance.
Animação Inicial: Uma animação com o logo é exibida ao iniciar o aplicativo.

Tecnologias Utilizadas:
React Native
Expo
TypeScript
React Native Reanimated para animações
Axios para comunicação com a API
json-server

Pré-requisitos:
Antes de começar, você precisará ter as seguintes ferramentas instaladas:
Node.js
Expo CLI
Git

Passo 1: Clonar o Repositório
Copiar código no prompt de comando
git clone https://github.com/seu-usuario/seu-projeto.git

Passo 2: Instalar Dependências
Navegue até o diretório do projeto e instale as dependências:
"cd seu-projeto"
"npm install" ou "yarn"

Passo 4: instale o pacote json-server
no prompt de comando digite:
"npm install -g json-server"

Passo 5: Executar o Projeto
Agora, execute o projeto com o comando:
"npx expo start" ou "yarn expo start"
Abra outro prompt de comando, navegue até a pasta do projeto e execute o comando:
"npx json-server db.json" ou "yarn json-server db.json" 



