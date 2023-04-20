const express = require('express');
const app = express();
app.use(express.json());

const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const contactRouter = require('./routes/contact');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

app.use('/api/lunchbox/v1/menu', menuRouter)
app.use('/api/lunchbox/v1/orders', orderRouter)
app.use('/api/lunchbox/v1/contact', contactRouter)
app.use('/api/lunchbox/v1/user', userRouter)
app.use('/api/lunchbox/v1/admin', adminRouter)

module.exports = app