const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const adminController = require('../controller/adminController')

router
  .route('/')
  .get(adminController.protect, userController.getAllUser)
  .post(userController.protect, userController.addNewUser)

router
  .route('/login')
  .post(userController.loginUser)
router
  .post('/forgotPassword', userController.forgotPassword)
  .patch('/resetPassword/:token', userController.resetPassword)
  .patch('/updatePassword', userController.protect, userController.updatePassword)
  .patch('/updateUser', userController.protect, userController.updateUser)
  .delete('/deleteUser', userController.protect, userController.deleteUser);

module.exports = router;