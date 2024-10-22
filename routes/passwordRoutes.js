const express = require('express');
const bcrypt = require('bcrypt');
const Password = require('../models/Password');

const router = express.Router();

// Route pour obtenir tous les mots de passe
router.get('/', async (req, res) => {
    try {
        const passwords = await Password.find();
        res.json(passwords);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des mots de passe' });
    }
});

// Route pour ajouter un mot de passe
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPassword = new Password({ username, password: hashedPassword });
        await newPassword.save();
        res.status(201).json(newPassword);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du mot de passe' });
    }
});

// Route pour supprimer un mot de passe
router.delete('/:id', async (req, res) => {
    try {
        const result = await Password.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Mot de passe non trouvé' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du mot de passe' });
    }
});

module.exports = router;
