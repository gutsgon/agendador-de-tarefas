
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

```bash
docker-compose up --build
```

Esse comando irá:

- Subir o **Redis**  (porta `6379`) 
- Buildar o **backend** (porta `3333`)  
- Buildar o **frontend** (porta `5173`)  

---

### 4. Acessar a aplicação

- **Frontend**: http://localhost:5173  
- **Backend API**: http://localhost:3333  

---

## 🧪 Rodar testes novamente (backend)

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

---

## ⚠️ Observações

- Certifique-se de que as portas 3333 (backend), 5173 (frontend) e 6379 (Redis) estão livres.  
- O backend usa Redis para agendamento de notificações (BullMQ).  
- As tarefas são notificadas via webhook 5 minutos antes do horário agendado.  

