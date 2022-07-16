const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../config/db-config');
const { Time } = require("./Time");
const { User } = require("./User");
const { Empresa } = require("./Empresa");
class UserEmpresa extends Model {}
    
UserEmpresa.init({
    useremail: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'email'
        },
        primaryKey: true
    },
        empresaid: {
            type: DataTypes.INTEGER,
            references: {
                model: Empresa,
                key: 'id'
            },
            primaryKey: true
        },
}, { 
    sequelize: sequelize, 
    schema: 'public',
    modelName: 'userempresa'
});
UserEmpresa.removeAttribute('id');
(async () => {
    await sequelize.sync();
})();

module.exports = { UserEmpresa };
