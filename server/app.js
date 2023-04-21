const express = require('express');
const app = express();
app.use(express.json());

const menuRouter = require('./routes/menuRoute');
const orderRouter = require('./routes/orderRoute');
const contactRouter = require('./routes/contactRoute');
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');

app.use('/api/lunchbox/v1/menu', menuRouter)
app.use('/api/lunchbox/v1/orders', orderRouter)
app.use('/api/lunchbox/v1/contact', contactRouter)
app.use('/api/lunchbox/v1/user', userRouter)
app.use('/api/lunchbox/v1/admin', adminRouter)

module.exports = app