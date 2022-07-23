const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../config/db-config');

class Time extends Model {}
    
Time.init({
    nome: DataTypes.STRING,
    desc: DataTypes.STRING,
    id: {
        primaryKey: true,
        type: DataTypes.STRING
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