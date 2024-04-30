const sequelize = require('./db');

const Animals = require('../models/Animals');
const Compte = require('../models/Compte');

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('La base de donnée est synchronisée avec succès')

    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}

syncDatabase();