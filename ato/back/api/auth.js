const Compte = require('../models/Compte');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const router = require('express').Router();
router.use(cookieParser());

const secretKey = crypto.randomBytes(32).toString('hex');

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erreur lors du hachage du mot de passe');
    }
};

const comparePasswords = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Erreur lors de la comparaison des mots de passe');
    }
};


//pour se connecter
router.post('/login', async (req, res, next) => {
    try {
        const compte = await Compte.findOne({ where: { email: req.body.email } });
        if (!compte) {
            return res.status(401).json({ message: 'Identifiant non trouvé' });
        }
        
        const match = await comparePasswords(req.body.password, compte.password);
        if (!match) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign(
            { id: compte.id },
            secretKey,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            id: compte.id,
            nom: compte.nom,
            token: token,
        });

        console.log('Utilisateur connecté avec succès');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const hashedPassword = await hashPassword(req.body.password);

        const newCompte = await Compte.create({
            nom: req.body.nom,
            email: req.body.email,
            password: hashedPassword
        });

        const savedCompte = await newCompte.save();
        res.status(201).json(savedCompte);
    } catch (err) {
        console.error('Erreur lors de la création ', err);
        res.status(500).json({ message: 'Erreur lors de la création' });
    }
});


module.exports = router;