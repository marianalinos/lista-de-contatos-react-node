# Projeto fullstack Node.js e React

Este repositório contém o código-fonte e os arquivos necessários para executar o projeto para a vaga de fullstack. 

## Requisitos

Para executar o aplicativo, é necessário ter instalado o Docker e o plugin Docker Compose.

### Docker

Docker é uma plataforma de software que permite criar, testar e executar aplicativos em contêineres. Ele permite que desenvolvedores criem aplicativos rapidamente e facilmente, sem se preocupar com a configuração do ambiente ou com problemas de compatibilidade. Para instalar o Docker, siga as instruções do site oficial:

[Docker](https://docs.docker.com/engine/install/)

### Docker Compose

O Docker Compose é um plugin para o Docker que permite definir e executar aplicativos com vários contêineres. Ele permite que você configure vários contêineres em um único arquivo de configuração, tornando mais fácil para você implantar e gerenciar seus aplicativos. Para instalar o Docker Compose, siga as instruções do site oficial:

[Docker Compose](https://docs.docker.com/compose/install/)

## Executando o aplicativo

### Variáveis de ambiente

O aplicativo usa variáveis de ambiente para configurar algumas de suas funcionalidades. Para configurar as variáveis de ambiente, crie um arquivo `.env` no diretório raiz do projeto, utilizando o arquivo `env.sample` como base.

### Rodando o aplicativo

Para executar o aplicativo, basta clonar o repositório e executar o comando `docker compose up` no diretório raiz do projeto. Isso irá construir e iniciar os contêineres necessários para executar o aplicativo.

```bash
git clone https://github.com/marianalinos/teste-magazord-contatos
cd teste-magazord-contatos
docker compose up
```

Após executar este comando, o aplicativo deverá estar disponível no localhost na porta que foi configurada no arquivo `.env`, tanto para web, como para backend e o banco de dados, é possível verificar o link exato na saída do comando.

## Parando o aplicativo

Para parar o aplicativo, basta executar o comando `docker compose down` no diretório raiz do projeto. Isso irá parar e remover os contêineres criados.

```bash
docker compose down
```

Isso irá parar e remover os contêineres criados.
