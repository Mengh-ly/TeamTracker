const express = require('express');
const router = express.Router();
const db = require('../../db');  // Assure-toi que ce chemin est correct

router.post('/', async (req, res) => {
    const { token } = req.body;

    try {
        // Utilisation de db.query pour exécuter la requête directement
        db.query(`
            SELECT id_Groupe,
                   IF(id = (SELECT id FROM user WHERE token = ?), 'oui', 'non') AS leader
            FROM user
            WHERE id_Groupe = (
                SELECT id_Groupe
                FROM user
                WHERE token = ?
            )
            ORDER BY id_Groupe
                LIMIT 1;
        `, [token, token], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Erreur du serveur.' });
                return;
            }

            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ message: 'Aucun utilisateur trouvé pour ce token.' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

module.exports = router;