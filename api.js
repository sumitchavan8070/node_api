// app.js
const express = require('express');
const cors = require('cors');
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
app.use(cors());
// const corsOptions = {
//   origin: 'http://localhost:3000', 
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, 
//   optionsSuccessStatus: 204 
// };

const allowedOrigins = ['http://localhost:5000', 'http://localhost:3000',];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));





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


// CORS middleware
// app.use((req, res, next) => {
//   console.log('Request received with method:', req.method);
//   console.log('Request received with headers:', req.headers);

//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   console.log('Response headers being sent:', res.getHeaders());

//   next();
// });




app.get('/', (req, res) => {  
    res.send('server is connected');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
