const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../config/db-config');

class Time extends Model {}
    
Time.init({
    nome: DataTypes.STRING,
    desc: DataTypes.STRING,
    adm: DataTypes.STRING,
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
}, { 
    sequelize: sequelize, 
    schema: 'public',
    modelName: 'time'
});

(async () => {
    await sequelize.sync();
})();

module.exports = { Time };