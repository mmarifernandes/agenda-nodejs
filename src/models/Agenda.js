const { DataTypes, Model } = require('sequelize');
const { Time } = require("./Time");

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
    time:{
        type: DataTypes.STRING,
        references: {
                model: Time,
                key: 'id'
            },
    }
}, { 
    sequelize: sequelize, 
    schema: 'public',
    modelName: 'agenda'
});
// Agenda.removeAttribute('id');
(async () => {
    await sequelize.sync();
})();

module.exports = { Agenda };
