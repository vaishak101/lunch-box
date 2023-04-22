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
    required: [true, "User must have a Password"]
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

const User = mongoose.model('User', userSchema, 'users');
module.exports = User