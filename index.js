const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');





const app = express();
const port = 3000;

// MySQL database configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paper'
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});


app.use(bodyParser.json());


//   
// app.get('/api/getSofasData', (req, res) => {
//     // Query to get data from the database with a limit of 50 items
//     const query = 'SELECT * FROM furniture LIMIT 50';

//     // Execute the query
//     connection.query(query, (err, results) => {
//         if (err) {
//             console.error('Error executing query:', err.message);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }
//         // Send the fetched data as JSON response
//         res.json(results);
//     });
// });


app.post('/api/getSofasData', (req, res) => {

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


        res.json({
            status: 1,
            response: 'Data fetched successfully.',
            result: results
        });
    });
});






app.get('/api/data', (req, res) => {

    const query = 'SELECT * FROM furniture';


    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(results);
    });
});




app.get('/api/sofas', (req, res) => {

    const query = 'SELECT * FROM furniture WHERE subcategory = ?';
    const values = ['Sofas'];



    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(results);
    });
});



// Define a route for the root URL

app.get('/', (req, res) => {
    res.send('api is connected');
});

// Start the server

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
