const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

router.route('/add').post(courseController.addCourse);

module.exports = router;