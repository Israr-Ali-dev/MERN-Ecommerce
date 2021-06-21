const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

// import routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const casesRoute = require('./routes/cases');
const phoneModelRoute = require('./routes/phoneModel');
const subCategoryRoute = require('./routes/subCategory');
const collectionsRoute = require('./routes/collections');
const braintreeRoute = require('./routes/braintree');
const orderRoute = require('./routes/order');
const newsletterRoute = require('./routes/newsletter');

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'));

//middlewares
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
  bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Expose-Headers', 'X-Total-Count, Content-Range');
  res.header('Content-Range', 'products 1-20/20');
  next();
});
// app.use(
//   '*',
//   cors({
//     // allowedHeaders: ['Content-Range', 'products 1-20/20'],
//     exposedHeaders: 'Content-Range',
//   })
// );

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// routes middleswares
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', casesRoute);
app.use('/api', phoneModelRoute);
app.use('/api', subCategoryRoute);
app.use('/api', collectionsRoute);
app.use('/api', braintreeRoute);
app.use('/api', orderRoute);
app.use('/api', newsletterRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
