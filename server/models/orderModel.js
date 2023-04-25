const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Order must have a UserEmail"]
  },
  particular: {
    type: Array,
    required: [true, "Order must have Items"]
  },
  totalQty: {
    type: Number,
    required: [true, "Order must have a Total Qty"]
  },
  totalPrice: {
    type: Number,
    required: [true, "Order must have a Total Price"]
  },
  orderDate: {
    default: Date.now(),
    type: Date,
  }
})

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order