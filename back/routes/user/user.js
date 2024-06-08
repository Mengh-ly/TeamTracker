const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {

    const{token}= req.body;

    db.query('SELECT lastname,firstname,email,color FROM User WHERE token = ?',[token], (error, results) => {
        if(results.length === 0){
            return res.status(401).json({
                message: 'Token incorrect'
            })
        }
        const userLastname = results[0].lastname;
        const userFirstname = results[0].firstname;
        const userEmail = results[0].email;
        const userColor = results[0].color;
        res.json({
            lastname: userLastname,
            firstname: userFirstname,
            email: userEmail,
            color: userColor,
        });
    });
});

module.exports = router;
