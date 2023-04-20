exports.getMenu = (req, res) => {
  res.status(200).json({ status: 200, message: "Sends Menu" })
}
exports.addMenuItem = (req, res) => {
  res.status(201).json({ status: 201, message: "Add New Item to Menu" })
}
exports.updateMenuItem = (req, res) => {
  res.status(201).json({ status: 201, message: "Update Item in Menu" })
}
exports.deleteMenuItem = (req, res) => {
  res.status(201).json({ status: 201, message: "Delete Item from Menu" })
}