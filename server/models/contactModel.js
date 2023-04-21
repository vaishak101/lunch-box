const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Contact Form must have a name"]
  },
  email: {
    type: String,
    required: [true, "Contact Form must have a Email ID"]
  },
  message: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

const Contact = mongoose.model('Contact', contactSchema, 'contact');
module.exports = Contact;