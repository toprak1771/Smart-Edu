const User = require('../models/User');

module.exports = async (req, res, next) => {
  await User.findById(req.session.userID).then((user) => {
    if(!user){
        return res.redirect('/login')
    }
    else {
        next();
    }
    
  }).catch((err) => {return res.redirect('/login')});
};
