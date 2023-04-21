const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Contact Form must have a name"]
  },
  email: {
    type: String,
    required: [true, "Contact Form must have a Email ID"]
  },
  message: {
    type: String,
  }
})

const Contact = mongoose.model('Contact', contactSchema, 'contact');
module.exports = Contact;