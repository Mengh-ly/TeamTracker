const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token non fourni' });
    }

    const sql = `
        SELECT g.title
        FROM groupe g
        INNER JOIN user u ON u.id_Groupe = g.id
        WHERE u.token = ?
    `;

    db.query(sql, [token], (err, results) => {
        if (err) {
            console.error("Erreur lors de l'exécution de la requête :", err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Aucun groupe trouvé pour ce token' });
        }

        const title = results[0].title;
        res.json({ title });
    });
});

module.exports = router;
