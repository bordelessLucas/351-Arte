# 351 Arte

Sistema web para reunir e gerenciar obras de arte relacionadas a clientes.

## 🚀 Tecnologias

- React 19
- TypeScript
- Vite
- Firebase (Authentication + Firestore)
- React Router DOM

## 📋 Pré-requisitos

- Node.js instalado
- Conta no Firebase
- Projeto Firebase criado

## ⚙️ Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Copie o conteúdo de `.env.example` e preencha com suas credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

4. Configure o Firebase:
   - No console do Firebase, ative Authentication (Email/Password)
   - Crie uma coleção `users` no Firestore (será criada automaticamente)

## 🏃 Executando o projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos React (Auth, etc)
├── hooks/          # Custom hooks
├── lib/            # Configurações (Firebase)
├── pages/          # Páginas da aplicação
│   ├── Login/      # Tela de login
│   ├── Register/   # Tela de registro
│   └── Home/       # Página inicial
├── routes/         # Configuração de rotas
└── services/       # Serviços (API, Firebase)
```

## 🎨 Funcionalidades

- ✅ Autenticação de usuários (Login/Registro)
- ✅ Proteção de rotas
- ✅ Gerenciamento de perfil de usuário
- ✅ Interface moderna e responsiva

## 📝 Próximos Passos

- Implementar CRUD de obras de arte
- Adicionar upload de imagens
- Sistema de categorização
- Busca e filtros
