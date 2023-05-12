const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).render('index', {
      status: 'success',
      page_name: 'index',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {

    const email = req.body.email;
    const password = req.body.password;
    

    await User.findOne({ email }).then((user) => {
      if(user) {
        bcrypt.compare(password, user.password, function (err, same) {
          if (same) {       
            //User Sessions
            req.session.userID = user._id;
           return res.status(200).redirect('/');
          }
          else{
            res.status(400).send("Yanlıs Sifre")
          }
        });
      }
      else {
        res.status(400).send("Gecersiz email")
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = async (req,res) => {
  try {
    req.session.destroy((err) =>{
      console.log(err);
      res.redirect('/');
    })
    console.log("session silindi");
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      error,
    });
  }
}
