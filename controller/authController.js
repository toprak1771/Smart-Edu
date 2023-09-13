const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');
const { validationResult } = require('../node_modules/express-validator');

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }

    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    await User.findOne({ email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, same) {
          if (same) {
            //User Sessions
            req.session.userID = user._id;
            return res.status(200).redirect('/users/dashboard');
          } else {
            req.flash('error',"Wrong password!");
            res.status(401).redirect('/login')
          }
        });
      } else {
        req.flash('error',"Email is not found!");
        res.status(401).redirect('/login')
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect('/');
    });
    console.log('session silindi');
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID }).populate(
      'courses'
    );
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });
    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      courses,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
