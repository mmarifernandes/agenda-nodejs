const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const { Empresa, EmpresaDAO } = require('../models/Empresa');
const { UserEmpresa, UserEmpresaDAO } = require('../models/UserEmpresa');
const { UserTime, UserTimeDAO } = require('../models/UserTime');
const { Agenda, AgendaDAO } = require('../models/Agenda');
const { dbcon } = require("../config/connection-db");

class CallendarController {

    async addevento(req, res) {
        const { params } = req.params.num
        console.log(req.params.num);
        // const {data} = (req.params.num).toString().replace("-","/")
        // console.log(data)
        const agendar = {
            titulo: req.body.nome,
            desc: req.body.desc,
            time: req.body.time,
            data: req.params.num+" "+req.body.hora,
        };
        console.log(agendar);
        await AgendaDAO.cadastrar(agendar);


        res.redirect('/agendaemp');
    }

    async agendarevento(req, res) {  
        const times = await dbcon.query("SELECT * FROM times join usertimes on usertimes.timeid = times.id where usertimes.useremail = '"+req.session.user.email+"'");
        
    res.render('agenda', {user: req.session.user, times: times.rows, param: req.params.num});

    }

}

module.exports = CallendarController;
