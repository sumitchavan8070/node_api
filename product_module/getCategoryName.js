const express = require('express');
const router = express.Router();
const connection = require('../db'); 

router.get('/', (req, res) => {
    const query = 'SELECT DISTINCT subcategory FROM furniture LIMIT 10'; 

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ 
                status: 0,
                response: 'Internal server error'
            });
        }


        res.json({
            status: 1,
            response: 'Data fetched successfully.',
            categories: results
        });
    });
});

module.exports = router;
