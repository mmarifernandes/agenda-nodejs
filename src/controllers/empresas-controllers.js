const bcrypt = require('bcrypt');
const { Time } = require('../models/Time');
const { User } = require('../models/User');
const { Empresa } = require('../models/Empresa');
const { UserTime } = require('../models/UserTime');
const { UserEmpresa } = require('../models/UserEmpresa');
const { Agenda } = require('../models/Agenda');


class EmpresasController {


    async cadastrar(req, res) {
        console.log('teste');

        const userBody = req.body;        
        const empresa = {
            nome: userBody.nome,
        }
        
        await Empresa.create(empresa);
        
        res.redirect('/home');
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

    res.redirect('/home');
}
            async addempresa(req, res) {
                res.render('addempresa', { user: req.session.user });
            }

}

module.exports = EmpresasController;
