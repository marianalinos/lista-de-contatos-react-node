# Projeto Fullstack Node.js e React

Este repositório contém o código-fonte completo do projeto desenvolvido para a vaga de desenvolvedor(a) fullstack, utilizando Node.js no backend e React no frontend.

## 🧰 Requisitos

Para rodar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

* [Docker](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en/download) (opcional, para rodar comandos diretamente fora dos containers)

## 🚀 Executando o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/marianalinos/teste-magazord-contatos
cd teste-magazord-contatos
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no arquivo `env.sample`. Ajuste os valores conforme necessário.

### 3. Subir os Containers

Com tudo configurado, execute:

```bash
docker compose up
```

Este comando irá construir e iniciar os containers da aplicação (backend, frontend e banco de dados). Os serviços estarão acessíveis nos endereços e portas definidos no `.env`.

## ⚙️ Migrations do Banco de Dados

Você pode executar as migrations de duas maneiras:

### Opção 1 – Via Node.js

```bash
cd backend
npm run prisma generate
npm run prisma migrate dev --schema prisma/schema.prisma
```

### Opção 2 – Via Docker

*(O container `contatos-backend` precisa estar rodando)*

```bash
docker exec contatos-backend npx prisma generate
docker exec contatos-backend npx prisma migrate dev --schema prisma/schema.prisma
```

## 🌱 Seed do Banco de Dados (Opcional)

Para popular o banco com dados iniciais:

### Opção 1 – Via Node.js

```bash
cd backend
npm run prisma db seed
```

### Opção 2 – Via Docker

```bash
docker exec contatos-backend npx prisma db seed
```

## 🧩 Sobre o Backend

O backend foi construído com as seguintes tecnologias:

* **Express** (API REST)
* **Zod** (validação de dados)
* **JWT e Bcrypt** (autenticação)

A API está disponível em `http://localhost:${SERVERPORT}` (por padrão, `5000`).
Um arquivo `openapi.json` na raiz do projeto documenta as rotas disponíveis com exemplos de requisições.

## 🎨 Sobre o Frontend

O frontend foi desenvolvido com:

* **React**
* **Vite**
* **Tailwind CSS**

Disponível em `http://localhost:${WEBPORT}` (por padrão, `3000`).
A tela inicial é a de login, a partir da qual é possível navegar pelas demais funcionalidades. Os ícones foram projetados para serem intuitivos, conforme os requisitos funcionais solicitados.

## 🛑 Parando o Projeto

Para encerrar a aplicação e remover os containers, execute:

```bash
docker compose down
```