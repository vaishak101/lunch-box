const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController')

router
  .route('/')
  .get(menuController.getMenu)
  .post(menuController.addMenuItem)

router
  .route('/:id')
  .patch(menuController.updateMenuItem)
  .delete(menuController.deleteMenuItem)

module.exports = router;