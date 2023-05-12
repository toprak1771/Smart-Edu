const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.route('/add').post(authController.addUser);
router.route('/signIn').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);

module.exports = router;