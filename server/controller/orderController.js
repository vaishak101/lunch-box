const Order = require('./../models/orderModel');
const apiUtils = require('./../utils/apiUtils')

exports.getAllOrder = async (req, res) => {
  try {
    let query = Order.find();
    if (req.query.month) {
      query = apiUtils.sortbyMonth(Order, req.query.month)
    }
    const order = await query;
    res.status(200).json({
      status: "success",
      results: order.length,
      orders: order
    })
  }
  catch (err) {
    console.log(err)
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}
exports.getTrending = async (req, res) => {
  try {
    const titleArray = await apiUtils.filterByMonth(Order, req.query)
    let filteredResult = apiUtils.weight(titleArray);

    res.status(200).json({
      status: "success",
      result: filteredResult.length,
      trendingItems: filteredResult
    })
  }
  catch (err) {
    console.log(err)
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
    console.log(err)
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}
exports.getUserOrder = (req, res) => {
  res.status(200).json({ status: 200, message: "Get User Specific Orders" })
}