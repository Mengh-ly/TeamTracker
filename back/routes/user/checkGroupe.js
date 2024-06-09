const express = require('express');
const router = express.Router();
const db = require('../../db'); // Assurez-vous que db est configuré pour se connecter à votre base de données

router.post('/', (req, res) => {
    const { token } = req.body;

    // Ajoutez ici votre logique pour vérifier le token si nécessaire

    const query = 'SELECT id, firstname, lastname FROM user WHERE id_Groupe IS NULL';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        res.status(200).json(results);
    });
});

module.exports = router;
