const { promisify } = require('util')
const crypto = require('crypto');
const User = require('./../models/userModel');
const asyncErrorHandler = require('./../middleware/asyncErrorHandle');
const jwt = require('jsonwebtoken');
const throwError = require('./../utils/throwError');
const sendEmail = require('./../utils/email');


const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECURE_CODE, { expiresIn: process.env.JWT_EXPIRY })
}

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const createSendToken = (user, statusCode, res) => {
  const token = createToken(user._id);
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

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

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = userExist;
  next();
})

exports.getAllUser = asyncErrorHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    result: user.length,
    menu: user
  })
})

exports.addNewUser = asyncErrorHandler(async (req, res) => {
  const user = await User.create(req.body);
  createSendToken(user, 201, res);
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

  createSendToken(user, 200, res);
})

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new throwError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/lunchbox/v1/user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    console.log(err)
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new throwError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new throwError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {

  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.validatePassword(req.body.passwordCurrent, user.password))) {
    return next(new throwError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

exports.updateUser = asyncErrorHandler(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new throwError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'address', 'phone');
  console.log(filteredBody)
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });


  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});