
# 📝 Aplicação de Tarefas com Notificações via Webhook

Este projeto é uma aplicação fullstack para cadastro e notificação de tarefas, utilizando:

- ⚙️ **Backend**: Node.js, Express, Prisma, BullMQ  
- 🌐 **Frontend**: React + Vite  
- 🧠 **Fila**: Redis via BullMQ  
- 🐋 **Containerização**: Docker & Docker Compose  

---

## 🚀 Como rodar localmente com Docker

### 1. Pré-requisitos

- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

---

### 2. Clone o projeto

```bash
git clone https://github.com/gutsgon/agendador-de-tarefas.git
cd agendador-de-tarefas
```

---

### 3. Build, testes e deploy local com Docker

---
## ⚠️ Observações

- **Antes de rodar a aplicação no Docker, lembre-se criar e substituir as variáveis de ambiente do arquivo `.env` conforme o exemplo fornecido em `.env.example` no diretório do backend (`/backend`) do projeto.**  
- Certifique-se de que as portas `3333`, `5173` e `6379` estejam livres.  
- A fila BullMQ com Redis gerencia o agendamento e execução de notificações.  
- Notificações são simuladas como webhooks e aparecem nos logs do backend.

---

```bash
docker-compose up --build
```

Esse comando irá:

- Subir o **Redis** (porta `6379`)  
- Buildar o **backend** (porta `3333`)  
- Buildar o **frontend** (porta `5173`)  

---

### 4. Acessar a aplicação

- **Frontend**: http://localhost:5173  
- **Backend API**: http://localhost:3333
- **Documentação da API**: http://localhost:3333/docs 

---

## 🔐 Login de Teste

Use as credenciais abaixo para acessar a aplicação manualmente:

- **Email**: `teste@gmail.com`  
- **Senha**: `123456`  

Após o login, você será redirecionado para o endpoint `/tarefas`.

> **Importante**: Tente acessar `/tarefas` antes do login para verificar o comportamento de autenticação da aplicação.

---

## 📦 Notificações via Webhook

- Ao cadastrar uma tarefa com horário futuro, a aplicação agenda uma notificação via BullMQ.  
- A notificação será **disparada automaticamente no console do Docker** 5 minutos antes do horário da tarefa.  
- Você pode acompanhar o envio da notificação diretamente nos logs do container backend com:

```bash
docker-compose logs -f backend
```

---

## 🧪 Rodar testes do backend novamente

```bash
docker-compose run --rm backend-tests
```

---

## 📂 Estrutura do projeto

```
/app
  ├── /backend      # API Express + Prisma + SQLite
  ├── /frontend     # Interface React + Vite
  ├── docker-compose.yml
  └── README.md
```

