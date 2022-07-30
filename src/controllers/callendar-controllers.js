const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const { Empresa, EmpresaDAO } = require('../models/Empresa');
const { UserEmpresa, UserEmpresaDAO } = require('../models/UserEmpresa');
const { UserTime, UserTimeDAO } = require('../models/UserTime');
const { Agenda, AgendaDAO } = require('../models/Agenda');
const { dbcon } = require("../config/connection-db");

class CallendarController {

    async addevento(req, res) {
        const { data } = req.params.num +" "+ req.body.hora;
        // const {data} = (req.params.num).toString().replace("-","/")
        // console.log(data)
        const agendar = {
            titulo: req.body.nome,
            desc: req.body.desc,
            time: req.body.time,
            data: req.params.num+" "+req.body.hora,
        };
        const agenda = await dbcon.query("SELECT *, agendas.id as agendaid FROM agendas join times on agendas.time = times.id join empresatimes on times.id = empresatimes.timeid join userempresas on empresatimes.empresaid = userempresas.empresaid where userempresas.useremail = '" + req.session.user.email + "'");
        let i = 0;
        while (i < agenda.rows.length) {
            console.log(new Date(req.params.num + " " + req.body.hora), new Date(agenda.rows[i].data));
            if (+new Date(req.params.num + " " + req.body.hora) === +new Date(agenda.rows[i].data) && req.body.time === agenda.rows[i].time) {
                res.send('Já tem um evento agendado para este time as '+req.body.hora+' horas')
                break
            }else{
                i++;
            }
            if (i === agenda.rows.length){
                await AgendaDAO.cadastrar(agendar);
                res.redirect('/agendaemp');
                break;

            }
        }
        
    
    }

    async agendarevento(req, res) {  
        const times = await dbcon.query("SELECT * FROM times join usertimes on usertimes.timeid = times.id where usertimes.useremail = '"+req.session.user.email+"'");
        console.log('aaaaaaaaAAAAAAAAAAAAAAAAAAAAAA')
        console.log(new Date(req.params.num))
        if (new Date(req.params.num).getDay() === 0 || new Date(req.params.num).getDay() === 6) {
            res.send("Você não pode agendar eventos no final de semana.")
        } else {
    res.render('agenda', {user: req.session.user, times: times.rows, param: req.params.num});
        }
    }

}

module.exports = CallendarController;
