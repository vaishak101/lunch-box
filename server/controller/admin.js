exports.addNewAdmin = (req, res) => {
  res.status(201).json({ status: 201, message: "Add New Admin Here" })
}
exports.loginAdmin = (req, res) => {
  res.status(200).json({ status: 200, message: "Admin Login" })
}
exports.updateAdmin = (req, res) => {
  res.status(201).json({ status: 201, message: "Update Admin Detail" })
}
exports.deleteAdmin = (req, res) => {
  res.status(201).json({ status: 201, message: "Delete Admin" })
}
