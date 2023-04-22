const Admin = require('./../models/adminModel');
const asyncErrorHandler = require('./../middleware/asyncErrorHandle')

exports.addNewAdmin = asyncErrorHandler(async (req, res) => {
  const admin = await Admin.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      admin: admin
    }
  })
})

exports.updateAdmin = asyncErrorHandler(async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).json({
    status: 'success',
    data: {
      admin
    }
  })
})

exports.deleteAdmin = asyncErrorHandler(async (req, res) => {
  const admin = await Admin.findByIdAndDelete(req.params.id, req.body)
  res.status(200).json({
    status: 'success',
    data: {
      admin
    }
  })
})

exports.loginAdmin = (req, res) => {
  res.status(200).json({ status: 200, message: "admin Login NOT DEFINED" })
}