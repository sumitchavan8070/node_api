const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('./db');
router.use(bodyParser.json());

router.post('/', (req, res) => {
    if (!req.body.hasOwnProperty('category')) {
        return res.status(400).json({
            status: 0,
            response: 'Invalid request. Category parameter is missing.'
        });
    }

    const query = 'SELECT * FROM furniture WHERE subcategory = ? LIMIT 10';
    const values = [req.body.category];

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
});


module.exports = router;
