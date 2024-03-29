const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.route('/add').post(categoryController.addCategory);
router.route('/:id').delete(categoryController.deleteCategory);
module.exports = router;