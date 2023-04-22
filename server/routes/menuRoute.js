const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController')
const userController = require('../controller/userController')

router
  .route('/')
  .get(userController.protect, menuController.getMenu)
  .post(menuController.addMenuItem)

router
  .route('/:id')
  .patch(menuController.updateMenuItem)
  .delete(menuController.deleteMenuItem)

module.exports = router;