const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const uuid = require('uuid'); // Import uuid library for generating tokens
const connection = require('../db');

router.use(bodyParser.json());

router.post('/', (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;

        // Check if any required field is missing
        if (!username || !email || !password || !phoneNumber) {
            return res.status(400).json({
                status: 0,
                response: 'Username, email, password, and phone number are required.'
            });
        }

        // Check if the email already exists in the database
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
                // Email already exists, return message
                return res.json({
                    status : 0, 
                    response: 'User already exists with this email.'
                });
            }

            // Generate a token for the user
            const token = uuid.v4(); // Generate a random UUID

            // Insert user into the database
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
                    token: token // Return the token in the response
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
