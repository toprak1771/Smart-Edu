const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const loginMiddleware = require('../middlewares/loginMiddleware');

router.route('/add').post(authController.addUser);
router.route('/signIn').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);

module.exports = router;