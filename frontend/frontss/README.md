# Sistema de Cadastro de Chamados

Aplicação web fullstack para gerenciamento de clientes e chamados de suporte, desenvolvida como trabalho da disciplina de Análise e Desenvolvimento de Sistemas.

## Contexto

O projeto utiliza o contexto de **cadastro de chamados de suporte**. Cada chamado possui:
- `id` (sequencial, gerado automaticamente no formato 0001)
- `descricao`
- `categoria` (baixo, medio, urgente)
- `prazo`
- `status` (aberto, em andamento, resolvido)
- `usuarioId` e `usuarioNome` (vínculo com o cliente)
- `data` (data de abertura)

Cada cliente possui:
- `id` (sequencial, gerado automaticamente no formato 0001)
- `nome`
- `email`
- `cpf`
- `dataNascimento`
- `telefone`
- `cidade`
- `estado`

---

## Arquitetura

O projeto segue uma arquitetura **cliente-servidor** com separação clara entre frontend e backend.

### Visão geral
```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
│  localhost:3001                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP (fetch)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js + Express)                    │
│  localhost:3000                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │ fs.readFileSync / fs.writeFileSync
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PERSISTÊNCIA (JSON)                         │
│  backend/data/users.json                                         │
│  backend/data/tickets.json                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Frontend

| Pasta | Responsabilidade |
|-------|-----------------|
| `components/` | Componentes fixos de layout (Header, Nav, Footer) |
| `pages/` | Telas por funcionalidade |

**Estrutura de pastas:**
```
frontend/frontss/src/
├── components/
│   ├── header/
│   ├── nav/
│   └── footer/
├── pages/
│   ├── section/        # Página inicial com lista de chamados
│   ├── login/          # Tela de login
│   ├── insert/         # Cadastrar novo cliente
│   ├── select/         # Listar clientes
│   ├── select_id/      # Buscar cliente por ID
│   ├── update/         # Atualizar cliente
│   ├── deletar/        # Deletar cliente
│   ├── chamados/       # Criar, listar e editar chamados
│   └── cotacoes/       # Cotações em tempo real (AwesomeAPI)
├── App.js
└── index.js
```

### Backend

| Pasta/Arquivo | Responsabilidade |
|---------------|-----------------|
| `server.js` | Configuração do Express, CORS e rotas |
| `routes/user.routes.js` | Rotas da API de clientes |
| `routes/ticket.routes.js` | Rotas da API de chamados |
| `utils/fileHandler.js` | Leitura e escrita no JSON |
| `data/users.json` | Persistência dos clientes |
| `data/tickets.json` | Persistência dos chamados |

**Estrutura de pastas:**
```
backend/
├── server.js
├── routes/
│   ├── user.routes.js
│   └── ticket.routes.js
├── utils/
│   └── fileHandler.js
└── data/
    ├── users.json
    └── tickets.json
```

---

## Instalação

### Pré-requisitos

- Node.js 
- npm

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend/frontss
npm install
```

---

## Execução

### 1. Iniciar o backend
```bash
cd backend
node server.js
```

O servidor estará disponível em **http://localhost:3000**

### 2. Iniciar o frontend
```bash
cd frontend/frontss
npm start
```

A aplicação abrirá em **http://localhost:3001**

> **Importante:** O backend deve estar rodando antes de iniciar o frontend.

---

## Portas utilizadas

| Serviço | Porta |
|---------|-------|
| Backend (API) | 3000 |
| Frontend (React) | 3001 |

---

## Rotas da API

### Clientes — base: `http://localhost:3000/users`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Retorna todos os clientes |
| GET | `/:id` | Retorna um cliente pelo ID |
| POST | `/` | Cadastra novo cliente |
| PUT | `/:id` | Atualiza cliente pelo ID |
| DELETE | `/:id` | Remove cliente pelo ID |

### Chamados — base: `http://localhost:3000/tickets`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Retorna todos os chamados |
| GET | `/:id` | Retorna um chamado pelo ID |
| POST | `/` | Cria novo chamado |
| PUT | `/:id` | Atualiza chamado pelo ID |

---

## API Externa

O sistema consome a **AwesomeAPI** para exibir cotações em tempo real na tela de Cotações.

**Endpoint utilizado:**
```
https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL
```

**Dados exibidos:**

| Moeda | Campo | Descrição |
|-------|-------|-----------|
| Dólar (USD-BRL) | `bid` | Cotação de compra |
| Euro (EUR-BRL) | `bid` | Cotação de compra |
| Bitcoin (BTC-BRL) | `bid` | Cotação de compra |
| Dólar (USD-BRL) | `pctChange` | Variação percentual do dia |

---

## Rotas do frontend

| Rota | Página |
|------|--------|
| `/` | Login |
| `/home` | Página inicial com chamados abertos |
| `/insert` | Cadastrar novo cliente |
| `/users` | Listar clientes |
| `/user-id` | Buscar cliente por ID |
| `/update-user` | Atualizar cliente |
| `/delete-user` | Deletar cliente |
| `/ticket` | Criar chamado |
| `/tickets` | Listar chamados |
| `/edit-ticket/:id` | Editar chamado |
| `/cotacoes` | Cotações em tempo real |

---

## Tecnologias

- **Frontend:** React 19, React Router DOM, CSS
- **Backend:** Node.js, Express, CORS
- **Persistência:** JSON com `fs.readFileSync` e `fs.writeFileSync`
- **API Externa:** AwesomeAPI (cotações de moedas)