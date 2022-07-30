const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const { dbcon } = require('../config/connection-db');
const { Empresa, EmpresaDAO } = require('../models/Empresa');
const { UserEmpresa, UserEmpresaDAO } = require('../models/UserEmpresa');
const { UserTime, UserTimeDAO } = require('../models/UserTime');
const { EmpresaTime, EmpresaTimeDAO } = require('../models/EmpresaTime');
const { Time, TimeDAO } = require('../models/Time');
const { user } = require('pg/lib/defaults');

class EmpresasController {


    async cadastrar(req, res) {
        console.log('teste');

        const userBody = req.body;
        const empresa = {
            nome: userBody.nome,
        }

        await EmpresaDAO.cadastrar(empresa);

        res.redirect('/empresas');
    }

    async cadastrartime(req, res) {
        console.log('teste');
        const { user } = { user: req.session.user.email }
        const { id } = { id: uniqid() };
        const userBody = req.body;
        const time = {
            id: id,
            nome: userBody.nome,
            desc: userBody.desc,
        }
        const timeuser = {
            useremail: user,
            timeid: id,
            tipo: 'adm',
            data: new Date()
        }
        const empresa = await UserEmpresaDAO.buscaPeloId(req.session.user.email)
        const empresatime = {
            empresaid: empresa.empresaid,
            timeid: id,
        }

        console.log(empresatime);
        await TimeDAO.cadastrar(time);
        await UserTimeDAO.cadastrar(timeuser);
        await EmpresaTimeDAO.cadastrar(empresatime);

        res.redirect('/empresa/homeempresa');
    }
    async empresauser(req, res) {
        const { user } = { user: req.session.user.email }
        console.log(user);
        const userBody = req.body;
        const empresauser = {
            useremail: user,
            empresaid: userBody.empresaid
        }

        await UserEmpresaDAO.cadastrar(empresauser);

        res.redirect('/empresa/homeempresa');
    }
    async addempresa(req, res) {
        res.render('addempresa', { user: req.session.user });
    }
    async addtime(req, res) {
        res.render('addtime', { user: req.session.user });
    }

    async homeempresa(req, res) {
        // const empresa = await UserEmpresaDAO.buscaPeloId(req.session.user.email)
        const empresa = await dbcon.query("SELECT * FROM empresas join userempresas on userempresas.empresaid = empresas.id where userempresas.useremail = '" + req.session.user.email + "'");

        const timesm = await dbcon.query("SELECT * FROM times join usertimes on usertimes.timeid = times.id where useremail = '" + req.session.user.email + "' and usertimes.tipo != 'pendente'");
        const times = await dbcon.query("SELECT * FROM times join empresatimes on empresatimes.timeid = times.id where empresaid = '" + empresa.rows[0].id + "'");
        const pendente = await dbcon.query("SELECT * FROM times join usertimes on usertimes.timeid = times.id where useremail = '" + req.session.user.email + "' and usertimes.tipo = 'pendente'");

        console.log(empresa)
        res.render('homeempresa', { user: req.session.user, times: times.rows, empresa: empresa.rows[0], timesm: timesm.rows, pendente: pendente.rows });
    }

    async timeinfo(req, res) {
        const empresa = await dbcon.query("SELECT * FROM empresas join userempresas on userempresas.empresaid = empresas.id where userempresas.useremail = '" + req.session.user.email + "'");

        const timesm = await dbcon.query("SELECT * FROM times join usertimes on usertimes.timeid = times.id where useremail = '" + req.session.user.email + "'and usertimes.tipo != 'pendente'");
        const times = await dbcon.query("SELECT * FROM times join empresatimes on empresatimes.timeid = times.id where empresaid = '" + empresa.rows[0].id + "'");
        const timeinfo = await dbcon.query("SELECT * FROM times join usertimes on times.id = usertimes.timeid where id = '" + req.params.id + "'");
        const timeadm = await dbcon.query("SELECT * FROM times join usertimes on times.id = usertimes.timeid where id = '" + req.params.id + "' and tipo = 'adm'");

        const users = await dbcon.query("SELECT *, users.nome as nomeu FROM usertimes join users on usertimes.useremail = users.email where timeid = '" + req.params.id + "' and usertimes.tipo != 'pendente'");
        console.log(empresa.rows[0].id, req.params.id)
        const usersemp = await dbcon.query("select distinct nome, email from users left join usertimes on users.email = usertimes.useremail join userempresas on userempresas.useremail = users.email where empresaid = "+empresa.rows[0].id+" and users.email not in (select useremail from usertimes where timeid =  '" + req.params.id + "')");

        res.render('timeinfo', { timeinfo: timeinfo.rows[0], timeadm: timeadm.rows[0], user: req.session.user, times: times.rows, empresa: empresa.rows[0], timesm: timesm.rows, users: users.rows, usersemp: usersemp.rows, param: req.params.id })
    }


        async convidartime(req, res) {
        console.log('teste');

        const userBody = req.body;
        const addpessoa = {
            useremail: userBody.userstime,
            timeid: req.params.id,
            tipo: 'pendente',
            data: new Date()
        }

        await UserTimeDAO.cadastrar(addpessoa);

        res.redirect('/empresa/homeempresa');
    }

    async aprova(req, res){
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        const user = {
            useremail: req.session.user.email,
            timeid: req.params.id,
            tipo: 'user'
        }
                await UserTimeDAO.aprova(user);
        res.redirect('/empresa/homeempresa');

    }
        async reprova(req, res) {
            const user = {
                useremail: req.session.user.email,
                timeid: req.params.id,
            }
            await UserTimeDAO.reprova(user);
            res.redirect('/empresa/homeempresa');

        }
}

module.exports = EmpresasController;
