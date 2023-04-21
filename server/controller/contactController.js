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
    let query = Contact.find()
    if (req.query.sort) {
      query = query.sort(req.query.sort)
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const msg = await Contact.countDocuments();
      if (skip >= msg) throw new Error('This page does not exist')
    }
    const contact = await query;

    res.status(200).json({
      status: "success",
      messages: contact
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