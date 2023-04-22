const User = require('./../models/userModel');
const asyncErrorHandler = require('./../middleware/asyncErrorHandle')

exports.getAllUser = asyncErrorHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    menu: user
  })
})

exports.addNewUser = asyncErrorHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: user
    }
  })
})

exports.updateUser = asyncErrorHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

exports.deleteUser = asyncErrorHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id, req.body)
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

exports.loginUser = (req, res) => {
  res.status(200).json({ status: 200, message: "User Login NOT DEFINED" })
}