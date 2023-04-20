const Admin = require('./../models/adminModel');

exports.addNewAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        admin: admin
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
exports.loginAdmin = (req, res) => {
  res.status(200).json({ status: 200, message: "admin Login NOT DEFINED" })
}
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      data: {
        admin
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

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      data: {
        admin
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