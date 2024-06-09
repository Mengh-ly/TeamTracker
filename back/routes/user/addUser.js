const express = require('express');
const router = express.Router();
const db = require('../../db'); // Assumant que db est l'objet de connexion à la base de données MySQL

router.post('/', (req, res) => {
    const { token, idUser } = req.body;

    // 1. Récupérer l'id_Groupe associé au token
    const queryToken = 'SELECT id_Groupe FROM user WHERE token = ?';
    db.query(queryToken, [token], (error, resultsToken, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Erreur lors de la récupération du token' });
            return;
        }

        if (resultsToken.length === 0) {
            res.status(404).json({ message: 'Token non trouvé' });
            return;
        }

        const id_Groupe = resultsToken[0].id_Groupe;

        // 2. Mettre à jour la table user avec id_Groupe
        const queryUpdateUser = 'UPDATE user SET id_Groupe = ? WHERE id = ?';
        db.query(queryUpdateUser, [id_Groupe, idUser], (error, resultsUpdate, fields) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
                return;
            }

            if (resultsUpdate.affectedRows === 0) {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
                return;
            }

            res.status(200).json({ message: 'Mise à jour effectuée avec succès' });
        });
    });
});

module.exports = router;
