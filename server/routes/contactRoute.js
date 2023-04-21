const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController')

router
  .route('/')
  .get(contactController.getMessages)
  .post(contactController.sendMessage)

router
  .route('/:id')
  .delete(contactController.deleteMessage)

module.exports = router;