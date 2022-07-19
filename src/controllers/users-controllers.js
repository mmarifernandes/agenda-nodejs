const bcrypt = require('bcrypt');
const { Time } = require('../models/Time');
const { User } = require('../models/User');
const { Empresa } = require('../models/Empresa');
const { UserTime } = require('../models/UserTime');
const { UserEmpresa } = require('../models/UserEmpresa');
const { Agenda } = require('../models/Agenda');


class UsersController {
    async detalhar(req, res) {
        
        const user = await User.findOne({
            where: {
                id: req.session.user.id
            },
            include: [Time]
        })
        
        return res.send(`<pre>${JSON.stringify(user, null, 2)}</pre>`); 
    }


    // async cadastrar(req, res) {
    //     console.log('teste');

    //     const userBody = req.body;
    //     const senha = bcrypt.hashSync(userBody.senha, 10); 
        
    //     const user = {
    //         nome: userBody.nome,
    //         email: userBody.email,
    //         senha,
    //         perfilpic: '/images'+req.file.filename

    //     }
        
    //     await User.create(user);
        
    //     res.redirect('/users/listagem');
    // }
    
    async showlogin(req, res){
        console.log('dsasdad')
        res.render('login');
    }

    async showcadastrar(req, res) {
        console.log('dsasdad')
        res.render('cadastro');
    }
    
    async login(req, res) {
        console.log("adasdasd");
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
