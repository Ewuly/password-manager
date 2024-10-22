const express = require('express');
const bcrypt = require('bcrypt');
const Password = require('../models/Password');

const router = express.Router();

// Route pour obtenir tous les mots de passe
router.get('/', async (req, res) => {
    try {
        const passwords = await Password.find({}, 'username'); // Ne récupère que les noms d'utilisateur, pas les mots de passe
        res.json(passwords);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des mots de passe' });
    }
});

// Route pour ajouter un mot de passe
router.post('/', async (req, res) => {
    console.log('Requête reçue:', req.body);
    const { username, password } = req.body;
    console.log('Tentative d\'ajout de mot de passe pour:', username);

    try {
        // Récupérer tous les mots de passe pour cet utilisateur
        const existingPasswords = await Password.find({ username });

        // Vérifier si le mot de passe existe déjà pour cet utilisateur
        for (const existingPassword of existingPasswords) {
            const isMatch = await bcrypt.compare(password, existingPassword.password);
            if (isMatch) {
                console.log('Mot de passe existant détecté pour:', username);
                return res.status(400).json({ error: 'Ce mot de passe existe déjà pour cet utilisateur.' });
            }
        }

        // Si le mot de passe n'existe pas, le hacher et l'ajouter
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPassword = new Password({ username, password: hashedPassword });
        await newPassword.save();

        // Compter le nombre de mots de passe pour cet utilisateur
        const userPasswordsCount = await Password.countDocuments({ username });

        console.log('Nouveau mot de passe ajouté pour:', username);
        res.status(201).json({ message: 'Mot de passe ajouté avec succès', userPasswordsCount });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du mot de passe:', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du mot de passe' });
    }
});

// Route pour supprimer un mot de passe
router.delete('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Trouver tous les mots de passe pour cet utilisateur
        const userPasswords = await Password.find({ username });

        // Vérifier si l'utilisateur a des mots de passe
        if (userPasswords.length === 0) {
            return res.status(404).json({ error: 'Aucun mot de passe trouvé pour cet utilisateur.' });
        }

        // Vérifier si le mot de passe correspond
        for (const pwd of userPasswords) {
            const match = await bcrypt.compare(password, pwd.password);
            if (match) {
                await Password.findByIdAndDelete(pwd._id);
                const remainingPasswordsCount = await Password.countDocuments({ username });
                return res.status(200).json({ message: 'Mot de passe supprimé avec succès', remainingPasswordsCount });
            }
        }

        return res.status(404).json({ error: 'Mot de passe non trouvé pour cet utilisateur.' });
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la suppression du mot de passe' });
    }
});

// Route pour modifier un mot de passe
router.put('/', async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        // Trouver tous les mots de passe pour cet utilisateur
        const userPasswords = await Password.find({ username });

        // Vérifier si l'utilisateur a des mots de passe
        if (userPasswords.length === 0) {
            return res.status(404).json({ error: 'Aucun mot de passe trouvé pour cet utilisateur.' });
        }

        // Vérifier si le nouveau mot de passe existe déjà
        const newPasswordExists = await Promise.all(userPasswords.map(async (pwd) => {
            return await bcrypt.compare(newPassword, pwd.password);
        }));

        if (newPasswordExists.includes(true)) {
            return res.status(400).json({ error: 'Ce nouveau mot de passe existe déjà pour cet utilisateur.' });
        }

        // Vérifier si l'ancien mot de passe correspond
        let passwordUpdated = false;
        for (const pwd of userPasswords) {
            const match = await bcrypt.compare(oldPassword, pwd.password);
            if (match) {
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                await Password.findByIdAndUpdate(pwd._id, { password: hashedNewPassword });
                passwordUpdated = true;
                break;
            }
        }

        if (passwordUpdated) {
            // Compter le nombre de mots de passe pour cet utilisateur
            const userPasswordsCount = await Password.countDocuments({ username });
            return res.json({ message: 'Mot de passe modifié avec succès.', userPasswordsCount });
        } else {
            return res.status(404).json({ error: 'Ancien mot de passe incorrect.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la modification du mot de passe' });
    }
});

module.exports = router;
