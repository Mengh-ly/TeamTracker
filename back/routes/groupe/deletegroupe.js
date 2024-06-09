const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token } = req.body;

    // Validate token
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    // Query database for user's id_Groupe
    db.query('SELECT id_Groupe FROM User WHERE token = ?', [token], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Token incorrect' });
        }

        const id_Groupe = results[0].id_Groupe;

        // Update all users with the same id_Groupe to null
        db.query('UPDATE User SET id_Groupe = NULL WHERE id_Groupe = ?', [id_Groupe], (error, updateResult) => {
            if (error) {
                console.error('Error updating id_Groupe:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            // Delete the group associated with the id_Groupe
            db.query('DELETE FROM groupe WHERE id = ?', [id_Groupe], (error, deleteResult) => {
                if (error) {
                    console.error('Error deleting group:', error);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                // Return only the id_Groupe
                res.json({ id_Groupe });
            });
        });
    });
});

module.exports = router;