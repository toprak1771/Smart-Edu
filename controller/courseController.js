const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.addCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      user:req.session.userID,
    });
    res.status(201).redirect('/courses');
  } catch (error) {
    console.log("error:",error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    let category_slug = req.query.categories;
    const category = await Category.findOne({ slug: category_slug });
    let filter = {};
    
    if (category_slug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdDate');
    const categories = await Category.find();
    
    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    const categories = await Category.find();
    res.status(200).render('course', {
      status: 'success',
      course,
      page_name: 'course',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.session.userID});
    await user.courses.push({_id:req.body.courseID});
    await user.save();

    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.session.userID});
    await user.courses.pull({_id:req.body.courseID});
    await user.save()

    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
