const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User must have a Email ID"]
  },
  password: {
    type: String,
    required: [true, "User must have a Password"]
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

const User = mongoose.model('User', userSchema, 'users');
module.exports = User