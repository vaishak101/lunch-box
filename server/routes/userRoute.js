const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.addNewUser)

router
  .route('/login')
  .post(userController.loginUser)
// .patch(userController.updateUser)
// .delete(userController.deleteUser)
router
  .post('/forgotPassword', userController.forgotPassword)
  .patch('/resetPassword/:token', userController.resetPassword);

module.exports = router;