const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController')


router.route('/trending').get(orderController.getTrending)
router
  .route('/')
  .get(orderController.getAllOrder)
  .post(orderController.addOrder)
router
  .route('/:id')
  .get(orderController.getUserOrder)

module.exports = router;