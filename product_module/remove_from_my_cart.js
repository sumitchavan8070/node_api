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

        // Fetch the current user's orders from the database
        const fetchQuery = 'SELECT orders FROM users WHERE id = ?';
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
            const existingOrders = fetchResults[0].orders ? JSON.parse(fetchResults[0].orders) : [];

            // Check if the product ID exists in the user's orders
            const productIndex = existingOrders.indexOf(productId);
            if (productIndex === -1) {
                // Product ID doesn't exist in the user's orders
                return res.status(404).json({
                    status: 0,
                    response: 'Product ID does not exist in user orders.'
                });
            }

            // Remove the product ID from the user's orders
            existingOrders.splice(productIndex, 1);

            // Update the orders column in the user table with the modified orders array
            const updateQuery = 'UPDATE users SET orders = ? WHERE id = ?';
            connection.query(updateQuery, [JSON.stringify(existingOrders), userId], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating user orders:', updateErr.message);
                    return res.status(500).json({ 
                        status: 0,
                        response: 'Internal server error'
                    });
                }

                // Return success response
                return res.status(200).json({
                    status: 1,
                    response: 'Product removed from user orders successfully.',
                    orderId: productId
                });
            });
        });
    } catch (error) {
        console.error('Error in removing product from user orders route:', error);
        return res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
