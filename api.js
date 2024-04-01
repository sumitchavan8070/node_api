// app.js
const express = require('express');
const getSofasData = require('./getSofasData');
const signUp = require('./user_module/sign_up');
const login = require('./user_module/login');
const dashboard = require('./dashboard/dashboard');
const productDetail = require('./product_module/product_detail');
const category = require('./product_module/getDataFromCategory');
const categoryName = require('./product_module/getCategoryName');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');



const app = express();






// Define API endpoints
app.use('/api/getSofasData', getSofasData);
app.use('/api/signUp', signUp);
app.use('/api/login', login);
app.use('/api/dashboard', dashboard);
app.use('/api/productDetail', productDetail);
app.use('/api/getCategoryData', category);
app.use('/api/getCategoryName', categoryName);



const PORT = process.env.PORT || 3000;


// app.get('/', (req, res) => {
//     res.send('api is connected');
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
