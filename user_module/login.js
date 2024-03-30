const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../db');

router.use(bodyParser.json());

router.post('/', (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if any required field is missing
        if (!email || !password) {
            return res.status(400).json({
                status: 0,
                response: 'Email and password are required.'
            });
        }

        // Retrieve user data based on email
        const getUserQuery = 'SELECT * FROM users WHERE email = ?';
        connection.query(getUserQuery, [email], (err, results) => {
            if (err) {
                console.error('Error retrieving user data:', err.message);
                return res.status(500).json({ 
                    status: 0,
                    response: 'Internal server error'
                });
            }

            // Check if user with the given email exists
            if (results.length === 0) {
                return res.json({
                    status: 0,
                    response: 'User not found.'
                });
            }

            const user = results[0];

            // Compare the provided password with the password retrieved from the database
            if (user.password !== password) {
                return res.status(401).json({
                    status: 0,
                    response: 'Incorrect password.'
                });
            }

            // If email and password are correct, return user data without mapping to key-value pairs
            res.status(200).json({
                status: 1,
                response: 'Login successful.',
                id: user.id,
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: user.token
            });
        });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
