const express = require('express');
const errorHandler = require('./middleware/errorHandle');
const throwError = require('./utils/throwError')
const cors = require("cors");
const menuRouter = require('./routes/menuRoute');
const orderRouter = require('./routes/orderRoute');
const contactRouter = require('./routes/contactRoute');
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [

//     ]
//   })
// );

app.use(cors());
app.use('/', (req, res) => {
  res.json({ message: 'Welcome to Lunch Box Server' })
})
app.use('/api/lunchbox/v1/menu', menuRouter)
app.use('/api/lunchbox/v1/orders', orderRouter)
app.use('/api/lunchbox/v1/contact', contactRouter)
app.use('/api/lunchbox/v1/user', userRouter)
app.use('/api/lunchbox/v1/admin', adminRouter)
app.all('*', (req, res, next) => {
  next(new throwError(`Can't find ${req.originalUrl} on this server!`, 404))
});
app.use(errorHandler);
module.exports = app