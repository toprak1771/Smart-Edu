const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

router.route('/add').post(courseController.addCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
module.exports = router;