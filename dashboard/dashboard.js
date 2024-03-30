const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection

router.get('/', (req, res) => {


    const query = 'SELECT * FROM furniture WHERE subcategory = ? LIMIT 10';
    const values = ["Slipper Chairs"]; 

    connection.query(query, values, (err, results) => {
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
                response: 'No data found for the specified category.'
            });
        }

        // Send response with fetched data
        res.json({
            status: 1,
            response: 'Data fetched successfully.',
            homeTitle: 'Explore What Your Home Needs',
            categories: [
                { category: 'Wing Chairs' },
                { category: 'Sofas' },
                { category: 'Computer Tables' }
            ],
            result: results
        });
    });
});

module.exports = router;
