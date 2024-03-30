const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection

router.post('/', (req, res) => {
    try {
        // Retrieve the brand from the POST parameters
        const { brand } = req.body; // Destructure brand directly from req.body
        console.log("Brand:", brand);
        if (!brand) {
            return res.status(400).json({ 
                status: 0,
                response: 'Invalid request. Brand parameter is missing in the POST body.'
            });
        }

        const query = 'SELECT * FROM furniture WHERE brand = ?';
        const values = [brand]; // Placeholders for prepared statement

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
                    response: 'No data found for the specified brand.'
                });
            }

            // Send response with fetched data
            res.json({
                status: 1,
                response: 'Data fetched successfully.',
                result: results // Return all matching rows
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
    