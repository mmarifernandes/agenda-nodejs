const { Router } = require('express');
const CallendarController = require('../controllers/callendar-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');

const routes = Router();

const callendarController = new CallendarController();

routes.get('/:num', callendarController.agendarevento);
routes.post('/addevento/:num', callendarController.addevento);


module.exports = routes;