# Projeto de Modelagem

Este projeto é uma aplicação web completa com frontend em HTML/CSS/JS e backend em Node.js, focada em cadastro e gerenciamento de produtos, compras e usuários, com geração de relatórios e gráficos.

## Funcionalidades

Cadastro e visualização de produtos  
Cadastro e gerenciamento de compras  
Cadastro de usuários  
Visualização de relatórios e gráficos  
Estrutura modular organizada em front/ e back/  
Uso de banco de dados (definido em .env)

---

## Pré-requisitos

**Node.js** 
**npm** 
**Banco de dados** (MySQL)
Git (opcional)

---

## Instalação

**Clone o repositório:**
bash
git clone [https://github.com/srArthurmsm/testede](https://github.com/srArthurmsm/testede)

**Acesse a pasta do projeto:**
bash
cd projetoModelagem

**Instale as dependências:**
bash
npm install

**Configure o arquivo .env:**

Crie o arquivo .env na raiz do projeto com as variáveis de ambiente de conexão com o banco de dados, por exemplo:
env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=nome_do_banco
PORT=3000

---

Execução

Para rodar o backend em desenvolvimento:
bash
node back/index.js

---

Acesso ao Frontend

Abra qualque arquirvo .html que se localiza na pasta front

---

Estrutura de Pastas
projetoModelagem/
│
├── back/               # Código backend (Node.js)
├── front/              # Páginas e scripts frontend
├── .env                # Variáveis de ambiente
└── package.json        # Dependências e scripts

---

Scripts úteis

npm install – Instala as dependências
node back/index.js – Executa o backend

---

## Autor

Arthur Marcos Serpa Martins

---

## Licença

Este projeto está licenciado sob a licença MIT.
