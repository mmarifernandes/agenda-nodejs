const { Time } = require('../models/Time');


class CallendarController {

    async cadastrar(req, res) {
        console.log('PostsController/cadastrar', req.body);

        const post = await Time.create({
            userId: req.session.user.id,
            titulo: req.body.titulo,
            texto: req.body.texto,
            imagem: req.file.filename
        });


        res.redirect('/posts');
    }

    async home(req, res) {    
              res.render('home');

    }

}

module.exports = CallendarController;
