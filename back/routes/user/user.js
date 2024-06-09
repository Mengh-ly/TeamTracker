const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token } = req.body;

    const query = `
        SELECT u.lastname, u.firstname, u.email, u.color, u.id_Groupe, g.title
        FROM User u
                 LEFT JOIN groupe g ON u.id_Groupe = g.id
        WHERE u.token = ?
    `;

    db.query(query, [token], (error, results) => {
        if (results.length === 0) {
            return res.status(401).json({
                message: 'Token incorrect'
            });
        }

        const userLastname = results[0].lastname;
        const userFirstname = results[0].firstname;
        const userEmail = results[0].email;
        const userColor = results[0].color;
        const userGroup = results[0].id_Groupe;
        const groupTitle = results[0].title;

        res.json({
            lastname: userLastname,
            firstname: userFirstname,
            email: userEmail,
            color: userColor,
            id_Groupe: userGroup,
            title: groupTitle
        });
    });
});

module.exports = router;
