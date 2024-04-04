const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection

router.use(express.json());

router.post('/', (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ 
                status: 0,
                response: 'Invalid request. userId is missing in the POST body.'
            });
        }

        // Fetch the current user data from the database
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

            if (existingOrders.length === 0) {
                // If no orders found, return empty products array
                return res.status(200).json({
                    status: 1,
                    response: 'No products found for the user.',
                    orders: existingOrders, // user's orders
                    products: [] // empty products array
                });
            }

            // Fetch details of products from the furniture table based on product IDs in the orders array
            const fetchProductQuery = `SELECT id, subcategory, name, brand, 
                CAST(REPLACE(REPLACE(price, '₹', ''), ',', '') AS DECIMAL(10,2)) AS price, 
                CAST(REPLACE(REPLACE(mrp, '₹', ''), ',', '') AS DECIMAL(10,2)) AS mrp, 
                discount, image 
                FROM furniture WHERE id IN (?)`;
            connection.query(fetchProductQuery, [existingOrders], (productFetchErr, productFetchResults) => {
                if (productFetchErr) {
                    console.error('Error fetching product data:', productFetchErr.message);
                    return res.status(500).json({ 
                        status: 0,
                        response: 'Internal server error'
                    });
                }

                // Convert price and MRP to numeric values
                productFetchResults.forEach(product => {
                    product.price = parseFloat(product.price);
                    product.mrp = parseFloat(product.mrp);
                });

                // Return the user's orders along with product details
                return res.status(200).json({
                    status: 1,
                    response: 'User orders retrieved successfully.',
                    orders: existingOrders, // user's orders
                    products: productFetchResults // details of products
                });
            });
        });
    } catch (error) {
        console.error('Error in fetching user orders route:', error);
        return res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
