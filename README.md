# 📒 Documentação do Projeto

Projeto desenvolvido para o desafio técnico da Bidweb.
A aplicação simula um sistema de monitoramento de vendas, com exibição de gráficos interativos, é possivel no sistema, além de visualizar os dados, criar uma venda, deletar e editar a mesma.
Sistema feito em API Rest e consumida no Front End.

<br>

## 👨🏻‍💻 Tecnologias Utilizadas:

<div style="display: inline_block">
  <img align="center" alt="CSS" heigth="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg">
  <img align="center" alt="ReactJS" heigth="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg">
  <img align="center" alt="JS" heigth="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg">
  <img align="center" alt="ViteJS" heigth="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg">
  <img align="center" alt="ViteJS" heigth="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/spring/spring-original.svg">
  <img align="center" alt="ViteJS" heigth="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/java/java-original.svg">
</div>

<br>

## 📚 Bibliotecas:
<div style="display: inline_block">
<h4>Front:</h4>
  - Axios
  - Router
  - Recharts
  - Lucide
  - Date-fns
</div>
<div style="display: inline_block">
<h4>Back:</h4>
  - Spring Security
  - JPA
  - H2 Database
  - Lombok
  - String Dev Tools
  - JWT
</div>
<br>

## 🎲 Como instalar:

## Para rodar o frontend e back, você precisa ter os seguintes requisitos instalados:

- **Visual Studio Code** ou outra IDE de sua preferência (Rodar na IDE, se quiser pode rodar em IDEs separadas)
- **Node.js**
- **Java SDK.18**
  
## Intruções de execução do Front

### Passo 1: GIT clone e Acesse o diretório do frontend

No terminal, clone o repositório e navegue até o diretório do frontend:

```bash
git clone https://github.com/DavidaMendes/Bidweb-Desafio
```

```bash
cd client
```

```bash
cd front.desafio.dgm
```
(se for preciso)

### Passo 2: Instale as dependências

Execute o comando abaixo para instalar todas as dependências do React.JS listadas no arquivo package.json:

```bash
npm install
```

### Passo 3: Inicie o front

Agora, inicie a aplicação React.js com o comando:

```bash
npm run dev
```

Isso irá rodar o frontend na sua máquina local.

## Instruções de execução do Back

### Passo 4: Acesse o diretório do backend

No terminal, com o repositório já clonado anteriormente navegue até o diretório do backend:

```bash
cd server
```

```bash
cd backend.desafio.dgm
```

### Passo 5: Inicie o back 

Execute o comando abaixo para rodar o back:

```bash
mvn spring-boot:run
```
(Se estiver utilizando o Intellij ou Eclipe, você pode apenas executar no botão de run)

Isso irá rodar o backend na sua máquina local.

## ⚙️ Testes e Como Funciona

### Login
A primeira página vai ser a de Login, nela você deve logar com o username <b>"admin"</b> e a senha <b>"senha123"</b>.

### Cadastro
Se você quiser pode cadastrar um usuário ao clicar em "Cadastrar" na primeira página de login. 
Lembrando que o banco roda em mémoria, então se fechar a aplicação e rodar de novo já não ira mais existir o novo usuário.

### Ver Vendas e Gráficos
Na página após o login, vai mostrar cards com as vendas feitas e os gráficos de exibição.

### Editar ou Remover Vendas
As vendas são totalmente editaveis e removiveis, só basta clicar no botão que tem os mesmos nomes, respctivamente.

### Criar Venda
Também é possível criar vendar, só basta apertar no botão de criar venda e preencher os requisitos de uma nova venda.

(Lembrando que toda ação que persiste no banco, roda em mémoria, então se fechar a aplicação e rodar de novo já não ira mais existir mais os novos dados)

## 🌐 Autor
- Davi Gomes Mendes

Obrigado 👋🏻!
