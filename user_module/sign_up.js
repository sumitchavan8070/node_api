const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const uuid = require('uuid'); 
const connection = require('../db');

router.use(bodyParser.json());

router.post('/', (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;


        if (!username || !email || !password || !phoneNumber) {
            return res.status(400).json({
                status: 0,
                response: 'Username, email, password, and phone number are required.'
            });
        }


        const emailCheckQuery = 'SELECT * FROM users WHERE email = ?';
        connection.query(emailCheckQuery, [email], (err, results) => {
            if (err) {
                console.error('Error checking email existence:', err.message);
                return res.status(500).json({ 
                    status: 0,
                    response: 'Internal server error'
                });
            }

            if (results.length > 0) {

                return res.json({
                    status : 0, 
                    response: 'User already exists with this email.'
                });
            }

            const token = uuid.v4(); 


            const insertQuery = 'INSERT INTO users (username, email, password, phoneNumber, token) VALUES (?, ?, ?, ?, ?)';
            const insertValues = [username, email, password, phoneNumber, token];
            connection.query(insertQuery, insertValues, (err) => {
                if (err) {
                    console.error('Error inserting user:', err.message);
                    return res.status(500).json({ 
                        status: 0,
                        response: 'Internal server error'
                    });
                }
                res.status(201).json({
                    status: 1,
                    response: 'User created successfully.',
                    token: token 
                });
            });
        });
    } catch (error) {
        console.error('Error in signup:', error.message);
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
