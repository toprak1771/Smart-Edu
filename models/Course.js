const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const courseSchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;