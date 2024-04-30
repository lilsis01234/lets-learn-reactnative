const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Compte extends Model{}

Compte.init({
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    nom:{
        type : DataTypes.STRING,
        allowNull : false,
    },
    lastResetRequest : {
       type : DataTypes.DATE, 
    }
},
{
    sequelize,
    modelName : 'Compte'
})

module.exports = Compte;