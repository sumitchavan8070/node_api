const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 0,
                response: 'Email and password are required.'
            });
        }

        const getUserQuery = 'SELECT * FROM users WHERE email = ?';
        connection.query(getUserQuery, [email], (err, results) => {
            if (err) {
                console.error('Error retrieving user data:', err.message);
                return res.status(500).json({ 
                    status: 0,
                    response: 'Internal server error'
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    status: 0,
                    response: 'User not found.'
                });
            }

            const user = results[0];

            if (user.password !== password) {
                return res.status(200).json({
                    status: 0,
                    response: 'Incorrect password.'
                });
            }

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
