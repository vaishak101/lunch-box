const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.addNewUser)

router
  .route('/:id')
  .get(userController.loginUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router;