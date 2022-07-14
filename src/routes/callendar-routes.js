const { Router } = require('express');
const CallendarController = require('../controllers/callendar-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');

const routes = Router();

const callendarController = new CallendarController();

routes.get('/', callendarController.home);

routes.post('/', isAuth, upload.single('meuarquivo'), callendarController.cadastrar);

module.exports = routes;