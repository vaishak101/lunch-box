const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Order must have a UserEmail"]
  },
  orderId: {
    type: String,
    unique: true,
    required: [true, "Order must have a OrderID"]
  },
  orderTitle: {
    type: String,
    required: [true, "Order must have a Order Title"]
  },
  orderQty: {
    type: Number,
    required: [true, "Order must have a Order Qty"]
  },
  orderPrice: {
    type: Number,
    required: [true, "Order must have a Order Price"]
  },
  orderDate: {
    default: Date.now(),
    type: Date,
  }
})

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order