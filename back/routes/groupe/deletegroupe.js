const express = require('express');
const router = express.Router();
const db = require('../../db');  // Assure-toi que ce chemin est correct

router.post('/', async (req, res) => {
    const { token } = req.body;

    try {
        // Requête pour récupérer l'id_Groupe à partir du token
        const selectGroupIdQuery = 'SELECT id_Groupe FROM user WHERE token = ?';
        const [groupIdRows] = await db.query(selectGroupIdQuery, [token]);

        if (!groupIdRows || groupIdRows.length === 0) {
            return res.status(404).json({ message: "Token non trouvé." });
        }

        const id_Groupe = groupIdRows[0].id_Groupe;

        // Requête pour mettre à jour l'id_Groupe de tous les utilisateurs associés à l'id_Groupe récupéré à NULL
        const updateUsersQuery = 'UPDATE user SET id_Groupe = NULL WHERE id_Groupe = ?';
        await db.query(updateUsersQuery, [id_Groupe]);

        res.status(200).json({ message: "Mise à jour réussie." });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour." });
    }
});

module.exports = router;