const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const { Time } = require('../models/Time');
const { User } = require('../models/User');
const { Empresa } = require('../models/Empresa');
const { UserTime } = require('../models/UserTime');
const { UserEmpresa } = require('../models/UserEmpresa');
const { Agenda } = require('../models/Agenda');
const { user } = require('pg/lib/defaults');


class EmpresasController {


    async cadastrar(req, res) {
        console.log('teste');
        
        const userBody = req.body;        
        const empresa = {
            nome: userBody.nome,
        }
        
        await Empresa.create(empresa);
        
        res.redirect('/empresas');
    }
    
    async cadastrartime(req, res) {
        console.log('teste');
        const { user } = { user: req.session.user.email }
        const { id } = { id: uniqid() };
        const userBody = req.body;        
        const time = {
            nome: userBody.nome,
            desc: userBody.desc,
            id: id
        }
        const timeuser = {
            useremail: user,
            timeid: id,
            tipo: 'adm'
        }
        await Time.create(time);
        await UserTime.create(timeuser);

        res.redirect('/empresa/homeempresa');
    }
async empresauser(req, res) {
    const { user } = { user: req.session.user.email }
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    console.log(user);
    const userBody = req.body;
    const empresauser = {
        useremail: user,
        empresaid: userBody.empresaid
    }

    await UserEmpresa.create(empresauser);

    res.redirect('/empresa/homeempresa');
}
            async addempresa(req, res) {
                res.render('addempresa', { user: req.session.user });
            }
            async addtime(req, res) {
                res.render('addtime', { user: req.session.user });
            }

                async homeempresa(req, res) {
                const times = await Time.findAll()

                res.render('homeempresa', { user: req.session.user, times: times });
            }

}

module.exports = EmpresasController;
