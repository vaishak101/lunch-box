const crypto = require('crypto');
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User must have a Email ID"],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a Valid Email']
  },
  password: {
    type: String,
    required: [true, "User must have a Password"],
    select: false
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
    required: [true, "User must have a Phone Number"]
  },
  address: {
    type: String,
    required: [true, "User must have a Address"]
  },
  dateOfReg: {
    default: Date.now(),
    type: Date,
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined;
  next();
})

userSchema.methods.validatePassword = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
}

userSchema.methods.passwordModifiedAfter = function (timeStamp) {
  let changedTimeStamp;
  if (this.passwordChangedAt) {
    changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
  }
  return timeStamp < changedTimeStamp;
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema, 'users');
module.exports = User