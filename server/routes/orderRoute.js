const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController')
const adminController = require('../controller/adminController')
const userController = require('../controller/userController')


router.route('/trending').get(adminController.protect, orderController.getTrending)
router
  .route('/')
  .get(adminController.protect, orderController.getAllOrder)
  .post(userController.protect, orderController.addOrder)

router
  .route('/user')
  .post(userController.protect, orderController.getUserOrder)

module.exports = router;