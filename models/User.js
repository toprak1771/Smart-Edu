const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const  Schema  = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        enum:["student","teacher","admin"],
        default:"student"
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 10, function (err,hash) {
        user.password = hash;
        next();
    });
})

const User = mongoose.model('User',userSchema);


module.exports = User;