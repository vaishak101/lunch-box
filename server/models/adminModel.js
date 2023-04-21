const mongoose = require('mongoose')

const adminModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Admin must have a name"]
  },
  uname: {
    type: String,
    unique: true,
    required: [true, "Admin must have a UserName"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Admin must have a Email ID"]
  },
  password: {
    type: String,
    required: [true, "Admin must have a Password"]
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Admin must have a Phone Number"]
  },
  dateOfReg: {
    default: Date.now(),
    type: Date,
  }
})

const Admin = mongoose.model('Admin', adminModel, 'admin');
module.exports = Admin