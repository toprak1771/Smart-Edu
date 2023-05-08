const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).render('index',{
      status: 'success',
      page_name:'index',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req,res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);
  
    const user = await User.findOne({email},(err,same) => {
      if(same) {
        bcrypt.compare(password, user.password, function(err, result){
          //User Sessions
          res.status(200).send('You are logged.');
        })
        console.log(err);
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}