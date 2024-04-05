const express = require('express');
const router = express.Router();
const connection = require('../db'); 

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

            const existingOrders = fetchResults[0].orders ? JSON.parse(fetchResults[0].orders) : [];

            if (existingOrders.length === 0) {
                return res.status(200).json({
                    status: 1,
                    response: 'No products found for the user.',
                    orders: existingOrders, 
                    products: [] 
                });
            }

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

                productFetchResults.forEach(product => {
                    product.price = parseFloat(product.price);
                    product.mrp = parseFloat(product.mrp);
                });

                return res.status(200).json({
                    status: 1,
                    response: 'User orders retrieved successfully.',
                    orders: existingOrders, 
                    products: productFetchResults 
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
