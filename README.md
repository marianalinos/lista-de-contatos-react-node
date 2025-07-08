# Projeto Fullstack Node.js e React

Este repositório contém o código-fonte completo do projeto desenvolvido como parte do processo seletivo para a vaga de desenvolvedor(a) fullstack, utilizando **Node.js** no backend e **React** no frontend.

## 🧰 Requisitos

Antes de executar o projeto, verifique se as seguintes ferramentas estão instaladas em sua máquina:

* [Docker](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en/download) *(opcional — necessário apenas se preferir rodar comandos fora dos containers)*

## 🚀 Executando o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/marianalinos/teste-magazord-contatos
cd teste-magazord-contatos
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no arquivo `env.sample`. Ajuste os valores conforme necessário.

### 3. Subir os Containers

Execute o comando abaixo para construir e iniciar os containers:

```bash
docker compose up
```

Esse processo inicia os serviços do backend, frontend e banco de dados. Aguarde até que todos os containers estejam rodando — pode levar alguns instantes devido aos healthchecks.

Os serviços estarão acessíveis nos endereços e portas definidos no `.env`.

## ⚙️ Executando as Migrations

Você pode rodar as migrations de duas formas:

### Opção 1 – Via Node.js

```bash
cd backend
npm run prisma generate
npm run prisma migrate dev --schema prisma/schema.prisma
```

### Opção 2 – Via Docker

*(com o container `contatos-backend` em execução)*

```bash
docker exec contatos-backend npx prisma generate
docker exec contatos-backend npx prisma migrate dev --schema prisma/schema.prisma
```

## 🌱 Populando o Banco de Dados (Opcional)

Também é possível adicionar dados iniciais ao banco, caso queira testar a aplicação sem fazer inserções manuais.

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

O backend foi desenvolvido com foco na simplicidade e clareza, utilizando as seguintes tecnologias:

* **Express** – estrutura da API REST
* **Zod** – validação de dados
* **JWT** e **Bcrypt** – autenticação e segurança
* **Prisma** – ORM moderno para integração com o banco de dados, facilitando a manipulação e consistência dos dados.

A API está disponível em: `http://localhost:${SERVERPORT}` (padrão: `5000`).
As rotas estão documentadas no arquivo `openapi.json`, localizado na raiz do projeto, com exemplos de payloads para facilitar testes.

## 🎨 Sobre o Frontend

O frontend foi construído com:

* **React** – Biblioteca JavaScript para criação de interfaces de usuário baseadas em componentes.
* **Vite** – Ferramenta moderna e rápida para build e desenvolvimento frontend.
* **Tailwind CSS** – Framework de CSS utilitário que facilita a criação de interfaces responsivas com classes pré-definidas.

Disponível em: `http://localhost:${WEBPORT}` (padrão: `3000`).

A tela inicial é a de login. A navegação é simples e direta, e os ícones foram escolhidos para representar de forma intuitiva as ações previstas nos requisitos funcionais.

## 🛑 Finalizando a Aplicação

Para encerrar a aplicação e remover os containers, execute:

```bash
docker compose down
```

## 🤝 Considerações Finais

Agradeço pela oportunidade de participar do processo seletivo e pelo tempo dedicado à análise deste projeto.
Fico totalmente à disposição para esclarecimentos, sugestões ou feedbacks.

Com apreço,
**Mariana Lino da Silva**