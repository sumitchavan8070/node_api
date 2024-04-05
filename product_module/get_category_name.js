const express = require('express');
const router = express.Router();
const connection = require('../db');

router.use(express.json());

router.post('/', (req, res) => {
    const { category } = req.body;

    if (!category) {
        return res.status(400).json({
            status: 0,
            response: 'Missing category parameter in the request body'
        });
    }

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

    connection.query(query, [category], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({
                status: 0,
                response: 'Internal server error',
                error: err.message
            });
        }

        const groupedResults = [];
        for (let i = 0; i < results.length; i += 2) {
            groupedResults.push(results.slice(i, i + 2));
        }

        res.json({
            status: 1,
            response: 'Data fetched successfully.',
            results: groupedResults
        });
    });
});

module.exports = router;
