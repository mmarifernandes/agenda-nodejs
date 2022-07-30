const { Router } = require('express');
const EmpresasController = require('../controllers/empresas-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { Empresa } = require('../models/Empresa');

const routes = Router();

const empresasController = new EmpresasController();



routes.post('/cadastroempresa', empresasController.cadastrar);
routes.get('/addempresa', empresasController.addempresa);
routes.post('/empresauser', empresasController.empresauser);
routes.get('/homeempresa', empresasController.homeempresa);
routes.get('/addtime', empresasController.addtime);
routes.post('/cadastrotime', empresasController.cadastrartime);
routes.get('/timeinfo/:id', empresasController.timeinfo);
routes.post('/convidartime/:id', empresasController.convidartime);
routes.get('/aprova/:id', empresasController.aprova);
routes.get('/reprova/:id', empresasController.reprova);




module.exports = routes;