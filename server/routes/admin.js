const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin')


router
  .route('/')
  .post(adminController.addNewAdmin)

router
  .route('/:id')
  .get(adminController.loginAdmin)
  .patch(adminController.updateAdmin)
  .delete(adminController.deleteAdmin)

module.exports = router;