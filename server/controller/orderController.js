const Order = require('./../models/orderModel');

exports.getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({
      status: "success",
      menu: order
    })
  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}
exports.addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        order: order
      }
    })
  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}
exports.getUserOrder = (req, res) => {
  res.status(200).json({ status: 200, message: "Get User Specific Orders" })
}