const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { idPlanning, token } = req.body;

    // Vérification du token dans la table user
    const getUserIdQuery = 'SELECT id FROM user WHERE token = ?';
    db.query(getUserIdQuery, [token], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        const userId = results[0].id;

        // Maintenant, nous pouvons insérer un nouvel enregistrement dans la table planning
        const addPlanningQuery = 'INSERT INTO planning (id, id_User) VALUES (?, ?)';
        db.query(addPlanningQuery, [idPlanning, userId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erreur lors de l\'ajout du planning.' });
            }

            // Récupérons l'id de l'insertion
            const insertedId = results.insertId;

            // Retourner l'idPlanning et un message de succès
            res.status(200).json({ idPlanning: insertedId, message: 'Planning ajouté avec succès.' });
        });
    });
});

module.exports = router;
