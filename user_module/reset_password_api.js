const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../db');

router.use(bodyParser.json());

router.post('/', (req, res) => {
    try {
        const { userId, newPassword } = req.body;

        if (!userId || !newPassword) {
            return res.status(400).json({
                status: 0,
                response: 'User ID and new password are required.'
            });
        }

        // Query to update the password
        const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';

        // Execute the update query
        connection.query(updateQuery, [newPassword, userId], (err, result) => {
            if (err) {
                console.error('Error updating password:', err.message);
                return res.status(500).json({ 
                    status: 0,
                    response: 'Internal server error'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    status: 0,
                    response: 'User not found.'
                });
            }

            res.status(200).json({
                status: 1,
                response: 'Password reset successfully.'
            });
        });
    } catch (error) {
        console.error('Error in resetting password:', error.message);
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
