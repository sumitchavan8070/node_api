// Import necessary modules
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Middleware to parse JSON bodies
router.use(express.json());

// Define a POST route handler
router.post('/', (req, res) => {
    // Extract the category parameter from the request body
    const { category } = req.body;

    // Check if category parameter is missing
    if (!category) {
        return res.status(400).json({
            status: 0,
            response: 'Missing category parameter in the request body'
        });
    }

    // Construct the SQL query
    const query = `
        SELECT 
            subcategory,
            image AS image_url,
            COUNT(*) AS category_count
        FROM 
            furniture
        WHERE
            subcategory LIKE CONCAT('%', ?, '%')
        GROUP BY 
            subcategory
        LIMIT 
            10`;

    // Execute the query
    connection.query(query, [category], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({
                status: 0,
                response: 'Internal server error',
                error: err.message
            });
        }

        // Group results into chunks of 2 categories per group
        const groupedResults = [];
        for (let i = 0; i < results.length; i += 2) {
            groupedResults.push(results.slice(i, i + 2));
        }

        // Send the response with grouped results
        res.json({
            status: 1,
            response: 'Data fetched successfully.',
            results: groupedResults
        });
    });
});

// Export the router
module.exports = router;
