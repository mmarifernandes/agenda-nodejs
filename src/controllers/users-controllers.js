const bcrypt = require('bcrypt');
const { Time } = require('../models/Time');
const { User } = require('../models/User');
const { Empresa } = require('../models/Empresa');
const { UserTime } = require('../models/UserTime');
const { UserEmpresa } = require('../models/UserEmpresa');
const { Agenda } = require('../models/Agenda');
const calendar = require("../../public/js/home");


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
        res.render('login');
    }

        async home(req, res) {
    const year = req.query.year || new Date().getFullYear()
        const month = req.query.month|| new Date().getMonth()
        const agenda = await Agenda.findAll()

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    res.render("home",{calendar: calendar(year),months,year,month, user: req.session.user, evento: agenda});
        }

    async showcadastrar(req, res) {
        res.render('cadastro');
    }
        async empresas(req, res) {
        const empresas = await Empresa.findAll()
            console.log(empresas)
        res.render('empresas', { user: req.session.user, empresas: empresas});
    }
    

    async login(req, res) {
        // console.log('UsersController/login', req.body);
        
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
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            console.log(req.session.user);
            res.redirect('/empresa/homeempresa');
        } else {
            return res.send('Senha nao confere...');
        }
        
    }
}

module.exports = UsersController;
