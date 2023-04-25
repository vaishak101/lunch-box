const Admin = require('./../models/adminModel');
const asyncErrorHandler = require('./../middleware/asyncErrorHandle')
const throwError = require('./../utils/throwError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const crypto = require('crypto');
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

const createSendToken = (admin, statusCode, res) => {
  const token = createToken(admin._id);
  // Remove password from output
  admin.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      admin
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

  const adminExist = await Admin.findById(decoded.id)
  if (!adminExist) {
    return next(new throwError("Admin no longer exist"), 401)
  }

  if (adminExist.passwordModifiedAfter(decoded.iat)) {
    return next(new throwError("Password changed! please login again", 401))
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.admin = adminExist;
  next();
})

exports.loginAdmin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new throwError('Please enter email and password', 400))
  }

  const admin = await Admin.findOne({ email }).select('+password')

  if (!admin || !await admin.validatePassword(password, admin.password)) {
    return next(new throwError('Incorrect Credentials!', 401))
  }

  createSendToken(admin, 200, res);
})

exports.addNewAdmin = asyncErrorHandler(async (req, res) => {
  const admin = await Admin.create(req.body);
  createSendToken(admin, 201, res);
})

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  // 1) Get admin based on POSTed email
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return next(new throwError('There is no admin with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = admin.createPasswordResetToken();
  await admin.save({ validateBeforeSave: false });

  // 3) Send it to admin's email
  const resetURL = `http://dev.lunch-box.com:3001/admin-reset-pw?lb=${resetToken}`;

  const message = `Forgot your password? Submit your new password and passwordConfirm to: ${resetURL}.\n
  If you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: admin.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    console.log(err)
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;
    await admin.save({ validateBeforeSave: false });

    return next(
      new throwError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  // 1) Get admin based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const admin = await Admin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is admin, set the new password
  if (!admin) {
    return next(new throwError('Token is invalid or has expired', 400));
  }
  admin.password = req.body.password;
  admin.passwordConfirm = req.body.passwordConfirm;
  admin.passwordResetToken = undefined;
  admin.passwordResetExpires = undefined;
  await admin.save();

  // 3) Update changedPasswordAt property for the admin
  // 4) Log the admin in, send JWT
  createSendToken(admin, 200, res);
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {

  // 1) Get admin from collection
  const admin = await Admin.findById(req.admin.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await admin.validatePassword(req.body.passwordCurrent, admin.password))) {
    return next(new throwError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  admin.password = req.body.password;
  admin.passwordConfirm = req.body.passwordConfirm;
  await admin.save();
  // admin.findByIdAndUpdate will NOT work as intended!

  // 4) Log admin in, send JWT
  createSendToken(admin, 200, res);
});

exports.updateAdmin = asyncErrorHandler(async (req, res) => {
  // 1) Create error if admin POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new throwError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'phone');

  // 3) Update admin document
  const updatedAdmin = await Admin.findByIdAndUpdate(req.admin.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      admin: updatedAdmin.email
    }
  });
})

exports.deleteAdmin = asyncErrorHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(req.admin.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
})
