const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Compte = require('./Compte');

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
    },
    personne:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Compte,
        key : 'id'
    }
    },
}, {
    sequelize,
    modelName: 'animals'
})
Animals.belongsTo(Compte, {
    foreignKey : 'personne',
    as: 'Personne',
    onDelete : 'CASCADE'
})
module.exports = Animals