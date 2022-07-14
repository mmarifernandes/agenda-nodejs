const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Post extends Model {}
    
Post.init({
    titulo: DataTypes.STRING,
    texto: DataTypes.STRING,
    imagem: DataTypes.STRING,
}, { 
    sequelize: sequelizeCon, 
    schema: 'aula-remota',
    modelName: 'post'
});

module.exports = { Post };