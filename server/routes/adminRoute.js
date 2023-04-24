const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')


router
  .route('/')
  .post(adminController.addNewAdmin)

router
  .route('/login')
  .post(adminController.loginAdmin)

router
  .post('/forgotPassword', adminController.forgotPassword)
  .patch('/resetPassword/:token', adminController.resetPassword)
  .patch('/updatePassword', adminController.protect, adminController.updatePassword)
  .patch('/updateAdmin', adminController.protect, adminController.updateAdmin)
  .delete('/deleteAdmin', adminController.protect, adminController.deleteAdmin);

module.exports = router;