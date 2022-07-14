const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class User extends Model {}
    
User.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    schema: 'aula-remota',
    modelName: 'user'
});

module.exports = { User };
