const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', async (req, res) => {
    const { token } = req.body;

    try {
        // Requête SQL pour mettre à jour id_Groupe à NULL
        const updateQuery = `
        UPDATE user
        SET id_Groupe = NULL
        WHERE token = ?;
        `;

        // Exécution de la requête SQL avec le token
        await db.query(updateQuery, [token]);

        // Réponse réussie si la mise à jour a été effectuée
        res.status(200).json({ message: 'id_Groupe mis à jour avec succès à NULL' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour de id_Groupe:', err.message);
        res.status(500).send('Erreur serveur lors de la mise à jour de id_Groupe');
    }
});

module.exports = router;