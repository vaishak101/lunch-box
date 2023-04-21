const Order = require('./../models/orderModel');

exports.getAllOrder = async (req, res) => {
  try {
    let query = Order.find();
    // if (req.query.month) {
    //   let [idObj] = await Order.aggregate([
    //     { $project: { month: { $month: '$orderDate' } } },
    //     { $match: { month: Number(req.query.month) } }
    //   ])
    //   query = Order.find(idObj._id)
    // }
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
exports.getTrending = async (req, res) => {
  try {
    const start = new Date(req.query.year, req.query.month - 1, 1);
    const end = new Date(req.query.year, req.query.month, 1);

    let result = await Order.find({
      orderDate: { $gte: start, $lt: end }
    });

    const titleArray = result.map(el => el.orderTitle)

    function count(arr) {
      let o = {}, i;
      for (i = 0; i < arr.length; ++i) {
        if (o[arr[i]]) ++o[arr[i]];
        else o[arr[i]] = 1;
      }
      return o;
    }

    function weight(arr_in) {
      let o = count(arr_in),
        arr = [], i;
      for (i in o) arr.push({ value: i, weight: o[i] });
      arr.sort(function (a, b) {
        return a.weight < b.weight;
      });
      return arr;
    }

    let filteredResult = weight(titleArray);

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