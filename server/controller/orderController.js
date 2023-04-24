const Order = require('./../models/orderModel');
const apiUtils = require('./../utils/apiUtils')
const asyncErrorHandler = require('./../middleware/asyncErrorHandle')
const throwError = require('./../utils/throwError');

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

exports.getUserOrder = asyncErrorHandler(async (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return next(new throwError("Please Send Email of User"), 400)
  }
  const email = req.body
  const order = await Order.find(email)

  if (order.length < 1) { return next(new throwError('No Orders Found', 400)) }

  res.status(200).json({
    status: 200,
    message: "Success",
    result: order.length,
    data: order
  })
})