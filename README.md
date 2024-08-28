# Carteira Financeira

## Desafio 
O objetivo consiste na criação de uma carteira financeira em que os usuários possam realizar transferência de saldo. Teremos apenas um tipo de usuário que pode enviar ou receber dinheiro de qualquer outro.

## Requisitos do desafio
- Criar cadastro
- Criar autenticação
- Usuários podem enviar ou receber dinheiro
- Validar se o usuário tem saldo antes da transferência.
- A operação de transferência deve ser uma transação passível de reversão em qualquer caso de inconsistência ou por solicitação do usuário.

## Descrição
Esse projeto foi desenvolvido com  base em um desafio tecnico, onde no projeto foi criado as seguintes funcionalidades:

- Registro de usuario:
- Realização de transferencias de saldos.
- Atualização de saldo bancario.

## Funcionalidades
1. Para realizar o cadastro de usuario:
- Via postman acessar a url abaixo passando os parametro de email, password e amount via metodo json no BODY do postman:

`http://localhost:3000/users/register`

2. Para realizar transferencias de saldo:
- Via postman acessar a url abaixo passando os parametro de email e amount via metodo json no BODY do postman:

`http://localhost:3000/users/transfer`

3. Para realizar atualização de saldo:

- Via postman acessar a url abaixo passando os parametro de email e amount via metodo json no BODY do postman:

`http://localhost:3000/users/update-balance/id`


## Tecnologias utilizadas
- NodeJs
- NestJs
- TypeScript

## Instalação
1. Clone o repositório: `git clone https://github.com/wastenio/carteira-financeira.git`
2. Acesse o diretório do projeto: `cd carteira-financeira`
3. Instale as dependências: `npm install -f`


