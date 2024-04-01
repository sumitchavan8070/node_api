// const express = require('express');
// const router = express.Router();
// const connection = require('../db'); // Import the database connection

// router.get('/', (req, res) => {
//     const query = 'SELECT * FROM furniture WHERE subcategory = ? LIMIT 4';
//     const values = ["Slipper Chairs"]; 
//     const categoryList = [
//         { name: "Sofa", image: "https://i.ibb.co/kKgMLkZ/Sofa.png", route: "category" },
//         { name: "Desk", image: "https://i.ibb.co/qgFSkPv/Desk.png", route: "category" },
//         { name: "Chair", image: "https://i.ibb.co/hZGS9yP/Chair.png", route: "category" }
//     ];

//     connection.query(query, values, (err, results) => {
//         if (err) {
//             console.error('Error executing query:', err.message);
//             return res.status(500).json({ 
//                 status: 0,
//                 response: 'Internal server error'
//             });
//         }
        
//         if (results.length === 0) {
//             return res.status(404).json({
//                 status: 0,
//                 response: 'No data found for the specified category.'
//             });
//         }

//         // Send response with fetched data
//         res.json({
//             status: 1,
//             response: 'Data fetched successfully.',
//             homeTitle: 'Explore What Your Home Needs',
//             categories: categoryList, // Use categoryList instead of category
//             result: results
//         });
//     });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection

router.get('/', (req, res) => {
    const query = 'SELECT DISTINCT subcategory FROM furniture LIMIT 50'; 

    connection.query(query, (err, results) => {
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
                response: 'No data found for the specified subcategories.'
            });
        }

        // Send response with fetched data
        res.json({
            status: 1,
            response: 'Data fetched successfully.',
            subcategories: results
        });
    });
});

module.exports = router;
