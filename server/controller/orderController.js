const Order = require('./../models/orderModel');
const apiUtils = require('./../utils/apiUtils')
const asyncErrorHandler = require('./../middleware/asyncErrorHandle')

exports.getAllOrder = asyncErrorHandler(async (req, res) => {
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

})

exports.getTrending = asyncErrorHandler(async (req, res) => {
  const titleArray = await apiUtils.filterByMonth(Order, req.query)
  let filteredResult = apiUtils.weight(titleArray);

  res.status(200).json({
    status: "success",
    result: filteredResult.length,
    trendingItems: filteredResult
  })

})

exports.addOrder = asyncErrorHandler(async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      order: order
    }
  })

})

exports.getUserOrder = (req, res) => {
  res.status(200).json({ status: 200, message: "Get User Specific Orders" })
}