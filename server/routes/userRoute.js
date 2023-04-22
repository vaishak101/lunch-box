const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.addNewUser)

router
  .route('/login')
  .get(userController.loginUser)
// .patch(userController.updateUser)
// .delete(userController.deleteUser)

module.exports = router;