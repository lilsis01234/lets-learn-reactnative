const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./api/auth'); 
const sequelize = require('./config/db');
const crud = require('./api/Crud');
const path = require('path');

// Set up CORS permissions
app.use(cors({ origin: 'http://localhost:19006', credentials: true }));

// Parse JSON request bodies
app.use(express.json());

// Mount the authRouter middleware at the '/auth' endpoint
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/auth', authRouter);
app.use('/crud',crud);
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Connecté à la base de données MySQL');
    })
    .catch((err) => {
        console.error('Erreur à la connexion à la base de données:', err);
    });

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
