const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token } = req.body;

    const query = 'SELECT id, firstname, lastname, email FROM user WHERE id_Groupe IS NULL';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
