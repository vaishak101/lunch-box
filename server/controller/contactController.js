const Contact = require('./../models/contactModel')

exports.sendMessage = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        contact: contact
      }
    })
  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}

exports.getMessages = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({
      status: "success",
      menu: contact
    })
  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      data: {
        contact
      }
    })
  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}