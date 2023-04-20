exports.sendMessage = (req, res) => {
  res.status(201).json({ status: 201, message: "Add Contact Message" })
}

exports.getMessages = (req, res) => {
  res.status(200).json({ status: 200, message: "Sends All Contact messages" })
}

exports.deleteMessage = (req, res) => {
  res.status(201).json({ status: 201, message: "Delete Message" })
}