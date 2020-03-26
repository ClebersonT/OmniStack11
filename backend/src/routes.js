const express = require('express');

const OngController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

//foi criado o controller SessionControlller.js
//estou querendo criar uma sessão
routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//pegar todos os casos cadastrados por uma ong
routes.get('/profile', ProfileController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
//recebe um route params para pegar o id que irá ser excluido
routes.delete('/incidents/:id', IncidentController.delete);


//exportar uma variavel de dentro de um arquivo
module.exports = routes;
