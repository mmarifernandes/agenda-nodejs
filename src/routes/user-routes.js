const { Router } = require('express');
const UsersController = require('../controllers/users-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { User } = require('../models/User');

const routes = Router();

const usersController = new UsersController();

routes.get('/profile', isAuth, usersController.detalhar);

routes.get('/listagem', async (req, res) => {
    const lista = await User.findAll();
    return res.send(JSON.stringify(lista));
});
routes.get('/cadastrar', usersController.showcadastrar);

// routes.post('/cadastrar', usersController.cadastrar);

// routes.post('/login', usersController.login);

routes.get('/login', usersController.showlogin);

module.exports = routes;