# 🚀 API - Task Manager

Esta é a API do sistema **Task Manager**, desenvolvida com **NestJS** e **PostgreSQL**. A API permite a criação, listagem e gerenciamento de tarefas, além de autenticação via JWT.

---

## 📌 Tecnologias Utilizadas

- **NestJS** - Framework Node.js para construção de APIs robustas
- **TypeScript** - Tipagem estática para maior segurança no código
- **PostgreSQL** - Banco de dados relacional
- **TypeORM** - ORM para integração com PostgreSQL
- **Docker** - Contêinerização da aplicação
- **JWT (JSON Web Token)** - Autenticação segura

---
## Endpoints Principais
### 📝 Usuários
POST /users - Criar um novo usuário
GET /users - Listar todos os usuários (somente admin)

### ✅ Autenticação
POST /auth/login - Login e geração de token
POST /auth/register - Criar conta de usuário

### 📋 Tarefas
POST /tasks - Criar uma nova tarefa
GET /tasks - Listar todas as tarefas do usuário autenticado
GET /tasks/:id - Buscar uma tarefa específica
PUT /tasks/:id - Atualizar uma tarefa
DELETE /tasks/:id - Deletar uma tarefa

## 🔐 Autenticação
A API utiliza JWT para autenticação. Após o login, o usuário recebe um token que deve ser enviado no cabeçalho das requisições protegidas.

### 📌 Para acessar os endpoints protegidos, inclua o token no cabeçalho:
Authorization: Bearer seu_token_jwt

## 🔧 Configuração e Instalação

### 1️⃣ Clone o repositório
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio


Executando com Docker
Se preferir, você pode rodar a API em um contêiner Docker.




