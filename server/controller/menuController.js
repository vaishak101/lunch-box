const Menu = require('./../models/menuModel');
const apiUtils = require('./../utils/apiUtils')

exports.getMenu = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let query = Menu.find();
    if (queryObj.name) {
      query = apiUtils.searchFilter(Menu, queryObj.name)
    }
    else {
      query = Menu.find(queryObj);
    }
    const allMenu = await query;
    res.status(200).json({
      status: "success",
      results: allMenu.length,
      menu: allMenu
    })
  }
  catch (err) {
    console.log(err)
    res.status(400).json({
      status: "Failed",
      error: err
    })
  }
}

exports.addMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        menuItem: menuItem
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

exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      data: {
        menuItem
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

exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      data: {
        menuItem
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