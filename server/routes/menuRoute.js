const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController')
const userController = require('../controller/userController')
const adminController = require('../controller/adminController')

router
  .route('/')
  .get(userController.protect, menuController.getMenu)
  .post(adminController.protect, menuController.addMenuItem)

router
  .route('/:id')
  .patch(adminController.protect, menuController.updateMenuItem)
  .delete(adminController.protect, menuController.deleteMenuItem)

module.exports = router;