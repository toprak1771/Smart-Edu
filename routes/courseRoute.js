const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.route('/add').post(roleMiddleware(["teacher","admin"]),courseController.addCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
module.exports = router;