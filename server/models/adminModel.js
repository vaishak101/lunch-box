const mongoose = require('mongoose')
const validator = require('validator')
var bcrypt = require('bcryptjs');
const crypto = require('crypto');

const adminModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Admin must have a name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Admin must have a Email ID"],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a Valid Email']
  },
  password: {
    type: String,
    required: [true, "Admin must have a Password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (e) {
        return e === this.password
      },
      message: "Confirm password doesn't match with entered password"
    }
  },
  passwordChangedAt: {
    type: Date
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Admin must have a Phone Number"]
  },
  dateOfReg: {
    default: Date.now(),
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }

})

adminModel.pre('save', async function (next) {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 8);
  // this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined;
  next();
})

adminModel.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

adminModel.methods.validatePassword = async function (enteredPassword, adminPassword) {
  return await bcrypt.compare(enteredPassword, adminPassword);
}

adminModel.methods.passwordModifiedAfter = function (timeStamp) {
  let changedTimeStamp;
  if (this.passwordChangedAt) {
    changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
  }
  return timeStamp < changedTimeStamp;
}

adminModel.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


const Admin = mongoose.model('Admin', adminModel, 'admin');
module.exports = Admin