const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection

router.use(express.json());

router.post('/', (req, res) => {
    try {

        console.log("Request Body:", req.body);


        const { category } = req.body;
        console.log("category:", category);
        if (!category) {
            return res.status(400).json({ 
                status: 0,
                response: 'Invalid request. category parameter is missing in the POST body.'
            });
        }

        const query = 'SELECT * FROM furniture WHERE subcategory = ? LIMIT 50';
  
        const values = [category]; 
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
                    response: 'No data found.'
                });
            }

            const groupedResults = [];
            for (let i = 0; i < results.length; i += 2) {
                groupedResults.push(results.slice(i, i + 2));
            }
            res.json({
                status: 1,
                response: 'Data fetched successfully.',
                result: groupedResults 
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
