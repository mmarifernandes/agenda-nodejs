const { Client } = require('pg')

const dbcon = new Client({
    connectionString: 'postgres://leoawtfaepdlav:3f263c095b88bc1024a5b1f93d6bfb6a74e0571c718a5fcb3d468412b85dd505@ec2-54-161-255-125.compute-1.amazonaws.com:5432/d3s2cv6fdu7361',
    ssl: {
        rejectUnauthorized: false
    }
});

dbcon.connect(err => {
    if (err) {
        console.log("ERRO!!! NAO FOI POSSIVEL CONECTAR NO BANCO");
        console.log( { err });
    } else {
        console.log("BANCO CONECTADO COM SUCESSO");
    }
});

module.exports = {
    dbcon
}
