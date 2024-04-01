const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection

// Middleware to parse JSON-encoded request bodies
router.use(express.json());

router.post('/', (req, res) => {
    try {
        // Log the request body parameters
        console.log("Request Body:", req.body);

        // Retrieve the ID from the POST parameters
        const { id } = req.body; // Destructure ID directly from req.body
        console.log("ID:", id);
        if (!id) {
            return res.status(400).json({ 
                status: 0,
                response: 'Invalid request. ID parameter is missing in the POST body.'
            });
        }

        const query = 'SELECT brand, subcategory, name, price, mrp, discount, image FROM furniture WHERE id = ?';
        const values = [id]; // Placeholders for prepared statement

        connection.query(query, values, (err, results) => { // Pass values to query
            if (err) {
                console.error('Error executing query:', err.message);
                return res.status(500).json({ 
                    status: 0,
                    response: 'Internal server error'
                });
            }
            
            if (results.length === 0) {
                return res.status(404).json({
                    status: 0,
                    response: 'No data found for the specified ID.'
                });
            }

            // Send response with fetched data
            res.json({
                status: 1,
                response: 'Data fetched successfully.',
                result: results[0] // Return the first matching row
            });
        });
    } catch (error) {
        console.error('Error in post API:', error.message);
        res.status(500).json({ 
            status: 0,
            response: 'Internal server error'
        });
    }
});

module.exports = router;
