const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://leoawtfaepdlav:3f263c095b88bc1024a5b1f93d6bfb6a74e0571c718a5fcb3d468412b85dd505@ec2-54-161-255-125.compute-1.amazonaws.com:5432/d3s2cv6fdu7361', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});
const dbcon = () => {
    return sequelize.authenticate()
        .then(result => {
            console.log('CONECTEI')
        }).catch(error => {
            console.log("Erro ao conectarAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(error)
        })
};
module.exports = { dbcon, sequelize };