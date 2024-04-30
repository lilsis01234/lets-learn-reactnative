const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Animals extends Model{};

Animals.init({
    nom: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    couleur: {
        type: DataTypes.STRING(1000),
    },
    description: {
        type: DataTypes.STRING(100000),
    },
    age: {
        type: DataTypes.STRING(3)
    },
    image : {
        type : DataTypes.STRING(1000)
    },
    sexe : {
        type: DataTypes.STRING(10)
    },
    favorite :{
        type: DataTypes.BOOLEAN(),
        allowNull:false
    }
}, {
    sequelize,
    modelName: 'animals'
})

module.exports = Animals