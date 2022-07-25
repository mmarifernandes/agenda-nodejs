const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const { Time } = require('../models/Time');
const { User } = require('../models/User');
const { Empresa } = require('../models/Empresa');
const { UserTime } = require('../models/UserTime');
const { UserEmpresa } = require('../models/UserEmpresa');
const { Agenda } = require('../models/Agenda');

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
            data: req.params.num+" "+req.body.hora
        };
        console.log(agendar);
        await Agenda.create(agendar);


        res.redirect('/home');
    }

    async agendarevento(req, res) {  
        const times = await Time.findAll()
        
    res.render('agenda', {user: req.session.user, times: times, param: req.params.num});

    }

}

module.exports = CallendarController;
