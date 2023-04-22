const { promisify } = require('util')
const User = require('./../models/userModel');
const asyncErrorHandler = require('./../middleware/asyncErrorHandle');
const jwt = require('jsonwebtoken');
const throwError = require('./../utils/throwError');


const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECURE_CODE, { expiresIn: process.env.JWT_EXPIRY })
}

exports.getAllUser = asyncErrorHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    menu: user
  })
})

exports.addNewUser = asyncErrorHandler(async (req, res) => {
  const user = await User.create(req.body);

  const token = createToken(user._id)

  res.status(201).json({
    status: "success",
    token,
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

exports.loginUser = asyncErrorHandler(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new throwError('Please enter email and password', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !await user.validatePassword(password, user.password)) {
    return next(new throwError('Incorrect Credentials!', 401))
  }

  const token = createToken(user._id)
  res.status(200).json({
    status: 200,
    token,
    message: "Logged In"
  })
})

exports.protect = asyncErrorHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new throwError("You are not logged in , Please login again"), 401)
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECURE_CODE)

  const userExist = await User.findById(decoded.id)
  if (!userExist) {
    return next(new throwError("User no longer exist"), 401)
  }

  if (userExist.passwordModifiedAfter(decoded.iat)) {
    return next(new throwError("Password changed! please login again", 401))
  }
  next();
})