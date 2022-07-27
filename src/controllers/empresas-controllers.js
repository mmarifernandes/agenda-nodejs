const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const { dbcon } = require('../config/connection-db');
const { Empresa, EmpresaDAO } = require('../models/Empresa');
const { UserEmpresa, UserEmpresaDAO } = require('../models/UserEmpresa');
const { UserTime, UserTimeDAO } = require('../models/UserTime');
const { EmpresaTime, EmpresaTimeDAO } = require('../models/EmpresaTime');
const { Time, TimeDAO } = require('../models/Time');

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
            tipo: 'adm'
        }
        const empresa = await UserEmpresaDAO.buscaPeloId(req.session.user.email)
        console.log(time);
        const empresatime = {
            empresaid: empresa.empresaid,
            timeid: id,
        }
        
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

                            const times = await dbcon.query('SELECT * FROM times');

                            console.log(times)
                            res.render('homeempresa', { user: req.session.user, times: times.rows });
            }
            
        }
        
        module.exports = EmpresasController;
        