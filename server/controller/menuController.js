const Menu = require('./../models/menuModel');
const apiUtils = require('./../utils/apiUtils')
const asyncErrorHandler = require('./../middleware/asyncErrorHandle')

exports.getMenu = asyncErrorHandler(async (req, res) => {
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
})

exports.addMenuItem = asyncErrorHandler(async (req, res) => {
  const menuItem = await Menu.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      menuItem: menuItem
    }
  })
})

exports.updateMenuItem = asyncErrorHandler(async (req, res) => {
  const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).json({
    status: 'success',
    data: {
      Item: menuItem.name
    }
  })
})

exports.deleteMenuItem = asyncErrorHandler(async (req, res) => {
  const menuItem = await Menu.findByIdAndDelete(req.params.id, req.body)
  res.status(200).json({
    status: 'success',
    data: {
      menuItem
    }
  })
})