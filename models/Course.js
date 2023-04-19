const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;
const slugify = require('slugify');

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
    slug:{
        type:String,
        unique:true
    }
});
courseSchema.pre('validate',function(next){
    this.slug = slugify(this.title,{
        lower:true,
        strict:true
    });
    next();
})

const Course = mongoose.model('Course',courseSchema);


module.exports = Course;