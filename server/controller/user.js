exports.getAllUser = (req, res) => {
  res.status(200).json({ status: 200, message: "Sends User List" })
}
exports.addNewUser = (req, res) => {
  res.status(201).json({ status: 201, message: "Add New User" })
}
exports.loginUser = (req, res) => {
  res.status(200).json({ status: 200, message: "User Login" })
}
exports.updateUser = (req, res) => {
  res.status(201).json({ status: 201, message: "Update User Detail" })
}
exports.deleteUser = (req, res) => {
  res.status(201).json({ status: 201, message: "Delete User" })
}
