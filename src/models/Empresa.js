const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../config/db-config');

class Empresa extends Model {}
    
Empresa.init({
    nome: DataTypes.STRING,
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, { 
    sequelize: sequelize, 
    schema: 'public',
    modelName: 'empresa'
});
// Empresa.removeAttribute('id');
(async () => {
    await sequelize.sync();
})();

module.exports = { Empresa };
