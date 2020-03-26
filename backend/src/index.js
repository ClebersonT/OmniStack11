const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
//informar que estareos utilizando json no corpo das requisicoes
app.use(express.json());

app.use(routes);

//escutando a porta....
//CANNOT GET/ -> SIGNIFICA QUE NÃO TEM NEHUMA ROTA

/**
 * Rota -> recursos
 */

 /**
  * METODOS HTTP
  * GET: BUSCAR
  * POST: CRIAR
  * PUT: ALTERAR
  * DELETE: DELETAR
  */

  /**
   * QUERY PARAMS - enviados na rota apos o "?" (FILTROS,PAGINAÇÃO)
   * ?name=cleberson
   * ROUTES PARAMS - IDENTIFICAR RECURSOS /users/:id
   * REQUEST BODY: corpo da requisição
   */

   /**
    * BANCOS DE DADOS
    * VAMOS USAR O SQLITE
    * DRIVER: SELECT * FROM users
    * 
    * estará pronto pra aceitar qualquer banco mysql
    * knex - npm install knex --save
    * npm install sqlite3
    * npx knex init
    * Query Builder :javascript ->  table('users').select('*').where();
    */

    /**
     * NODEMON
     * npm install nodemon -D
     * -D -  somente em desenvolvimento
     */

     /**
      * criação de tabela usando o migrations
      * 
      */

app.listen(3333);