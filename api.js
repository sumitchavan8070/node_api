// app.js
const express = require('express');
const getSofasData = require('./getSofasData');
const signUp = require('./user_module/sign_up');
const login = require('./user_module/login');
const dashboard = require('./dashboard/dashboard');
const productDetail = require('./product_module/product_detail');
const category = require('./product_module/get_data_from_category');
const categoryName = require('./product_module/get_category_name');
const getOtp = require('./user_module/getOtp');
const addToCart = require('./product_module/add_to_cart');
const myOrders = require('./product_module/my_orders');
const sendOtpViaFirebase = require('./user_module/send_otp_firebase');
const removeFromMyCart = require('./product_module/remove_from_my_cart');
const resetPassword = require('./user_module/reset_password_api');
const getGistData = require('./user_module/getDataFromGist');
const checkApp = require('./services/checkApp');
const activity = require('./portfolio/activity');



const app = express();






//  API endpoints
app.use('/api/getSofasData', getSofasData);
app.use('/api/signUp', signUp);
app.use('/api/login', login);
app.use('/api/dashboard', dashboard);
app.use('/api/productDetail', productDetail);
app.use('/api/getCategoryData', category);
app.use('/api/getCategoryName', categoryName);
app.use('/api/getOtp', getOtp);
app.use('/api/addToCart', addToCart);
app.use('/api/myOrders', myOrders);
app.use('/api/removeFromMyCart', removeFromMyCart);
// app.use('/api/sendOtpViaFirebase', sendOtpViaFirebase);
app.use('/api/resetPassword', resetPassword);
app.use('/api/getGistData', getGistData);
app.use('/api/checkApp', checkApp);

// portfilio api`s 
app.use('/api/activity', activity);



const PORT = process.env.PORT || 5000;



// function myMiddleware(req, res, next) {
//   next(); 
// }

// app.use(myMiddleware);


app.get('/', (req, res) => {  
    res.send('server is connected');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
