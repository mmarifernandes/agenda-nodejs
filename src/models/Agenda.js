const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../config/db-config');

class Agenda extends Model {}
    
Agenda.init({
    titulo: DataTypes.STRING,
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    desc: DataTypes.STRING,
    data: DataTypes.DATE,

}, { 
    sequelize: sequelize, 
    schema: 'public',
    modelName: 'user'
});
Agenda.removeAttribute('id');
(async () => {
    await sequelize.sync();
})();

module.exports = { Agenda };
