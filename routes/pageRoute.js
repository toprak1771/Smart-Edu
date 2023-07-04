const express = require('express');
const router = express.Router();
const pageController = require('../controller/pageController');
const loginMiddleware = require('../middlewares/loginMiddleware');

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(loginMiddleware, pageController.getRegisterPage);
router.route('/login').get(loginMiddleware, pageController.getLoginPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendMail);

module.exports = router;
