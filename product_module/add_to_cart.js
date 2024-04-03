const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection

router.use(express.json());

router.post('/', (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ 
                status: 0,
                response: 'Invalid request. userId or productId is missing in the POST body.'
            });
        }

        // Fetch the current user data from the database
        const fetchQuery = 'SELECT * FROM users WHERE id = ?';
        connection.query(fetchQuery, userId, (fetchErr, fetchResults) => {
            if (fetchErr) {
                console.error('Error fetching user data:', fetchErr.message);
                return res.status(500).json({ 
                    status: 0,
                    response: 'Internal server error'
                });
            }

            if (fetchResults.length === 0) {
                return res.status(404).json({
                    status: 0,
                    response: 'User not found.'
                });
            }

            // Extract existing orders array or initialize an empty array if it doesn't exist
            let existingOrders = fetchResults[0].orders ? JSON.parse(fetchResults[0].orders) : [];

            // If existingOrders is not an array, create a new array and add the existing value if it exists
            if (!Array.isArray(existingOrders)) {
                existingOrders = existingOrders ? [existingOrders] : [];
            }

            // Add the new productId to the orders array
            existingOrders.push(productId);

            // Convert the orders array back to JSON string before updating the database
            const updatedOrders = JSON.stringify(existingOrders);

            // Update the user's orders array in the database
            const updateQuery = 'UPDATE users SET orders = ? WHERE id = ?';
            connection.query(updateQuery, [updatedOrders, userId], (updateErr, updateResults) => {
                if (updateErr) {
                    console.error('Error updating user data:', updateErr.message);
                    return res.status(500).json({ 
                        status: 0,
                        response: 'Internal server error'
                    });
                }

                res.json({
                    status: 1,
                    response: 'Product added to cart successfully.',
                    updatedOrders: existingOrders
                });
            });
        });
    } catch (error) {
        console.error('Error in add to cart API:', error.message);
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
