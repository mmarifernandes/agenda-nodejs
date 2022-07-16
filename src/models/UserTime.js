const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../config/db-config');
const { Time } = require("./Time");
const { User } = require("./User");
const { Empresa } = require("./Empresa");
class UserTime extends Model {}
    
UserTime.init({
    useremail: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'email'
        },
        primaryKey: true
    },
        timeid: {
            type: DataTypes.INTEGER,
            references: {
                model: Time,
                key: 'id'
            },
            primaryKey: true
        },
}, { 
    sequelize: sequelize, 
    schema: 'public',
    modelName: 'usertime'
});
UserTime.removeAttribute('id');
(async () => {
    await sequelize.sync();
})();

module.exports = { UserTime };
