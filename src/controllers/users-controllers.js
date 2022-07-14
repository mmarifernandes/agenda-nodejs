const bcrypt = require('bcrypt');
const { Post } = require('../models/Post');
const { User } = require('../models/User');


class UsersController {
    async detalhar(req, res) {
        
        const user = await User.findOne({
            where: {
                id: req.session.user.id
            },
            include: [Post]
        })

        return res.send(`<pre>${JSON.stringify(user, null, 2)}</pre>`); 
    }


    async cadastrar(req, res) {
        console.log('UsersController/cadastrar', req.body);

        const userBody = req.body;
        const senha = bcrypt.hashSync(userBody.senha, 10); 
        
        const user = {
            nome: userBody.nome,
            email: userBody.email,
            senha      
        }

        await User.create(user);
    
        res.redirect('/users/listagem');
    }

    async login(req, res) {
        console.log('UsersController/login', req.body);

        // ACHAR COM O EMAIL CERTO
        const { email, senha } = req.body;
        const usuarioEcontrado = await User.findOne({
            where: {
                email
            }
        });

        if (!usuarioEcontrado) return res.send('User nao encontrado');

        // VERIFICAR A SENHA
        const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);
        
        if (confere) {
            req.session.user = usuarioEcontrado;
            return res.send('Usuario e senha confirmados, vc fez o login');
        } else {
            return res.send('Senha nao confere...');
        }
        
    }
}

module.exports = UsersController;
