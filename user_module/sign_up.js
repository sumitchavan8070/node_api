const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const uuid = require('uuid'); 
const connection = require('../db');

router.use(bodyParser.json());

router.post('/', (req, res) => {
    try {
        const { username, email, password, phoneNumber, dateOfBirth, referral } = req.body;

        if (!username || !email || !password || !phoneNumber || !dateOfBirth) {
            return res.status(400).json({
                status: 0,
                response: 'Username, email, password, phone number, and date of birth are required.'
            });
        }

        if (!isValidDate(dateOfBirth)) {
            return res.status(400).json({
                status: 0,
                response: 'Invalid date of birth format. It should be YYYY-MM-DD.'
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

            // Check if referral column exists and create if not
            const insertQuery = referral ? 
                'INSERT INTO users (username, email, password, phoneNumber, dateOfBirth, token, referral) VALUES (?, ?, ?, ?, ?, ?, ?)' :
                'INSERT INTO users (username, email, password, phoneNumber, dateOfBirth, token) VALUES (?, ?, ?, ?, ?, ?)';

            connection.query('SHOW COLUMNS FROM users LIKE "referral"', (err, columns) => {
                if (err) {
                    console.error('Error checking for referral column:', err.message);
                    return res.status(500).json({ 
                        status: 0,
                        response: 'Internal server error'
                    });
                }

                if (columns.length === 0 && referral) {
                    connection.query('ALTER TABLE users ADD COLUMN referral VARCHAR(255)', (err) => {
                        if (err) {
                            console.error('Error adding referral column:', err.message);
                            return res.status(500).json({ 
                                status: 0,
                                response: 'Internal server error'
                            });
                        }
                        // Continue with user insertion after adding column
                        executeInsertQuery();
                    });
                } else {
                    // Column already exists or referral is not provided, proceed with user insertion
                    executeInsertQuery();
                }
            });

            // Function to execute user insertion query
            function executeInsertQuery() {
                // SQL query for user insertion
                const insertValues = referral ? 
                    [username, email, password, phoneNumber, dateOfBirth, token, referral] :
                    [username, email, password, phoneNumber, dateOfBirth, token];

                // Execute insertion query
                connection.query(insertQuery, insertValues, (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err.message);
                        return res.status(500).json({ 
                            status: 0,
                            response: 'Internal server error'
                        });
                    }
                    const userId = result.insertId; // Fetch the last inserted ID
                    res.status(200).json({
                        status: 1,
                        response: 'User created successfully.',
                        token: token,
                        id: userId // Return user ID in the response
                    });
                });
            }
        });
    } catch (error) {
        console.error('Error in signup:', error.message);
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

function isValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
}

module.exports = router;
