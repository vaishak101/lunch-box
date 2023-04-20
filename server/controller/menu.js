const Menu = require('./../models/menu');

exports.getMenu = async (req, res) => {
  try {
    const allMenu = await Menu.find();
    console.log(allMenu)
    res.status(200).json({
      status: "success",
      menu: allMenu
    })
  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}

exports.addMenuItem = async (req, res) => {
  try {
    const newItem = await Menu.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        menuItem: newItem
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

exports.updateMenuItem = (req, res) => {
  res.status(201).json({ status: 201, message: "Update Item in Menu" })
}
exports.deleteMenuItem = (req, res) => {
  res.status(201).json({ status: 201, message: "Delete Item from Menu" })
}