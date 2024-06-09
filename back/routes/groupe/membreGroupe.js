const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token } = req.body;

    // First, retrieve the group ID of the user based on the token
    db.query('SELECT id_Groupe FROM user WHERE token = ?', [token], (error, results, fields) => {
        if (error) {
            console.error('Error retrieving group ID:', error);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const groupId = results[0].id_Groupe;

        // Second, retrieve only necessary columns from user table
        db.query('SELECT id, firstname, lastname, color FROM user WHERE id_Groupe = ?', [groupId], (error, results, fields) => {
            if (error) {
                console.error('Error retrieving users:', error);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            // Process results to compute username with first letter of firstname and lastname
            const users = results.map(user => {
                const username = `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`;
                const color = user.color; // Get color from the query results
                return {
                    id: user.id,
                    username: username,
                    color: color
                };
            });

            res.json(users);
        });
    });
});

module.exports = router;
