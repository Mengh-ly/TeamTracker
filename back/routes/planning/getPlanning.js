const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    // Requête pour récupérer toute la table planning et les couleurs associées depuis la table user
    const query = `
        SELECT planning.*, user.color
        FROM planning
        LEFT JOIN user ON planning.id_User = user.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            res.status(500).send('Erreur lors de la récupération des données');
            return;
        }

        // Les données ont été récupérées avec succès
        res.json(results);
    });
});

module.exports = router;
