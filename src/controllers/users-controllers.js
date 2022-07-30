const bcrypt = require('bcrypt');
const { User, UserDAO } = require('../models/User');
const { dbcon } = require('../config/connection-db');

const calendar = require("../../public/js/home");


class UsersController {
    // async detalhar(req, res) {

    //     const user = await User.findOne({
    //         where: {
    //             id: req.session.user.id
    //         },
    //         include: [Time]
    //     })

    //     return res.send(`<pre>${JSON.stringify(user, null, 2)}</pre>`);
    // }


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

 async logout(req, res) {
  req.session.destroy();
  res.redirect('/');
  }

    async showlogin(req, res) {
        res.render('login');
    }

    async agendaemp(req, res) {
        const year = req.query.year || new Date().getFullYear()
        const month = req.query.month || new Date().getMonth()
        const agenda = await dbcon.query("SELECT *, agendas.id as agendaid FROM agendas join times on agendas.time = times.id join empresatimes on times.id = empresatimes.timeid join userempresas on empresatimes.empresaid = userempresas.empresaid where userempresas.useremail = '"+req.session.user.email+"'");
        console.log(agenda);
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        res.render("agendaemp", { calendar: calendar(year), months, year, month, user: req.session.user, evento: agenda.rows });
    }


        async eventoinfo(req, res) {
        const year = req.query.year || new Date().getFullYear()
        const month = req.query.month || new Date().getMonth()
        const info = await dbcon.query("SELECT times.nome as timenome, agendas.desc as eventodesc, times.desc as timedesc, agendas.id as id, * FROM agendas join times on times.id = agendas.time where agendas.id = '"+req.params.id+"'");
        const agenda = await dbcon.query("SELECT *, agendas.id as agendaid FROM agendas join times on agendas.time = times.id join empresatimes on times.id = empresatimes.timeid join userempresas on empresatimes.empresaid = userempresas.empresaid where userempresas.useremail = '" + req.session.user.email + "'");
        console.log("Teste")
        console.log(info.rows);
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        res.render("eventoinfo", { calendar: calendar(year), months, year, month, user: req.session.user, evento: agenda.rows, info: info.rows[0] });
    }

    async showcadastrar(req, res) {
        res.render('cadastro');
    }
    async empresas(req, res) {
        const empresas = await dbcon.query('SELECT * FROM empresas');
        console.log(empresas)
        res.render('empresas', { user: req.session.user, empresas: empresas.rows });
    }


    async login(req, res) {
        // console.log('UsersController/login', req.body);

        // ACHAR COM O EMAIL CERTO
        const { email, senha } = req.body;
        const usuarioEcontrado = await UserDAO.buscaPeloId(email);

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
