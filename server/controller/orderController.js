const Order = require('./../models/orderModel');

exports.getAllOrder = async (req, res) => {
  try {
    let query = Order.find();
    if (req.query.month) {
      let [idObj] = await Order.aggregate([
        { $project: { month: { $month: '$orderDate' } } },
        { $match: { month: Number(req.query.month) } }
      ])
      query = Order.find(idObj._id)
    }
    const order = await query;
    res.status(200).json({
      status: "success",
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