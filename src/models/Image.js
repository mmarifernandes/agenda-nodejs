const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://leoawtfaepdlav:3f263c095b88bc1024a5b1f93d6bfb6a74e0571c718a5fcb3d468412b85dd505@ec2-54-161-255-125.compute-1.amazonaws.com:5432/d3s2cv6fdu7361', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

class Image extends Model {}
    
Image.init({
    description: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING
}, { 
    sequelize, 
    schema: 'users',
    modelName: 'image'
});

sequelize.sync();

module.exports = { Image };
