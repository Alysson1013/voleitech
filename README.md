# voleitech

## Executando Projeto

1. Mudar para diretório backend.
```
cd backend
```
2. Instalar dependencias.
```
npm install
```
3. Criar arquivo .env com informações do banco de de dados, chave de criptografia e informações do projeto.
```
#NODE_ENV=production
NODE_ENV=development

APP_DB_HOST=localhost
APP_DB_PORT=#porta utilizada
APP_DB_NAME=#nome do banco
APP_DB_USER=#nome do usuario
APP_DB_PASSWORD=#senha do banco de dados

APP_AUTH_SECRET=#chave de criptografia
```
4. Executar comando de criação de banco de dados.
```
npx knex migrate:latest
```


