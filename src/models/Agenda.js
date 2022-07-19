const { DataTypes, Model } = require('sequelize');
const { User } = require("./User");

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
    adm:{
        type: DataTypes.STRING,
        references: {
                model: User,
                key: 'email'
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
