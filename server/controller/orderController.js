exports.getAllOrder = (req, res) => {
  res.status(200).json({ status: 200, message: "Get All Orders" })
}
exports.addOrder = (req, res) => {
  res.status(201).json({ status: 201, message: "Add New Order" })
}
exports.getUserOrder = (req, res) => {
  res.status(200).json({ status: 200, message: "Get User Specific Orders" })
}