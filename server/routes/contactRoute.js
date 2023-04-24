const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController')
const adminController = require('../controller/adminController')

router
  .route('/')
  .get(adminController.protect, contactController.getMessages)
  .post(contactController.sendMessage)

router
  .route('/:id')
  .delete(adminController.protect, contactController.deleteMessage)

module.exports = router;