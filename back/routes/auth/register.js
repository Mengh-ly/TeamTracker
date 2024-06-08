const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    function generateToken() {
        return Math.random().toString(36).substr(2, 9);
    }

    function generateRandomHexColor() {
        function getRandomHex() {
            let hex = Math.floor(Math.random() * 256).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }
        let color;
        do {
            color = '#' + getRandomHex() + getRandomHex() + getRandomHex();
        } while (color === '#000000' || color === '#ffffff');
        return color;
    }

    // Vérifier si l'email existe déjà
    db.query('SELECT * FROM User WHERE email = ?', [email], (error, results) => {
        if (results.length > 0) {
            // L'email existe déjà
            return res.status(400).json({ error: 'Email déjà utilisé' });
        }

        // L'email n'existe pas, procéder à l'insertion de l'utilisateur
        const token = generateToken();
        const color = generateRandomHexColor();

        const insertSql = 'INSERT INTO User (firstname, lastname, email, password, color, token) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [firstname, lastname, email, password, color, token];

        db.query(insertSql, values, (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
            }

            // Succès de l'insertion
            return res.status(201).json({ message: 'Utilisateur créé avec succès' });
        });
    });
});

module.exports = router;
