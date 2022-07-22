const { Router } = require('express');
const EmpresasController = require('../controllers/empresas-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { Empresa } = require('../models/Empresa');

const routes = Router();

const empresasController = new EmpresasController();



routes.post('/cadastroempresa', empresasController.cadastrar);
routes.get('/addempresa', empresasController.addempresa);
routes.post('/empresauser', empresasController.empresauser);




module.exports = routes;