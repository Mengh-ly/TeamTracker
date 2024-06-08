const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { title, token } = req.body;
    db.query('INSERT INTO groupe (title) VALUES (?)', [title], (error, results) => {
        if (error) {
            return res.status(500).json({
                message: 'Erreur lors de la création du groupe'
            });
        }

        const insertedId = results.insertId;

        // Maintenant, mettre à jour la table `user`
        db.query('UPDATE user SET id_Groupe = ? WHERE token = ?', [insertedId, token], (error, results) => {
            if (error) {
                return res.status(500).json({
                    message: 'Erreur lors de la mise à jour de l\'utilisateur'
                });
            }

            return res.status(201).json({
                message: 'Groupe créé avec succès et utilisateur mis à jour'
            });
        });
    });
});

module.exports = router;
