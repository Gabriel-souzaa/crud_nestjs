<div align="center">
	 <img alt="crud" align="center" src="https://www.dorusomcutean.com/wp-content/uploads/2020/03/crud.jpg" width="140px">
</div>

<div align="center">
  <h3>
    CRUD EVENTS
  </h3>

  <p>
  Projeto CRUD baseado em eventos e autenticação do usuário
  <p>
    <a href="#-requerimentos"> Requerimentos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-docker"> Docker</a>&nbsp;&nbsp;&nbsp;
  </p>
</div>

## Requerimentos

```bash
# git clone REPOSITÓRIO_PROJETO && cd/NOME_PROJETO
```

**Siga os passos**

```bash
# Instale as dependências
$ yarn

# Criar o aqruivo de variaveis do ambiente .env
$ touch .env

# O arquivo .env deve conter

SECRET_JWT=
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASS=
DATABASE_NAME=

# inicie o projeto como dev
$ yarn start:dev
```

## 🐳 Docker

**Suba o container utilizando o docker-compose**

```bash
docker-compose up -d # (Não passe o -d se quiser acompanhar a iniciação do projeto)
```
