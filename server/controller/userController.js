const User = require('./../models/userModel');

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      menu: user
    })
  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}
exports.addNewUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: user
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
exports.loginUser = (req, res) => {
  res.status(200).json({ status: 200, message: "User Login NOT DEFINED" })
}
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      data: {
        user
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

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      data: {
        user
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