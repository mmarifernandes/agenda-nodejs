const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../config/db-config');

class User extends Model {}
    
User.init({
    nome: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    senha: DataTypes.STRING,
    perfilpic: DataTypes.STRING,

}, { 
    sequelize: sequelize, 
    schema: 'public',
    modelName: 'user'
});
User.removeAttribute('id');
(async () => {
    await sequelize.sync();
})();

module.exports = { User };
