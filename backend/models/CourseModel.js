import mongoose from "mongoose";
import { title } from "process";
const { Schema } = mongoose;

// module schema
const moduleSchema = new Schema({
    title : { type : String , required : true},
    lessons : [lessonSchema],
})

// lesson schema 
const lessonSchema = new Schema({
    title : { type : String , require: true},
    videoUrl : { type : String , required : true},
})


const CourseSchema = new Schema({
    title : { type: String , required : true},
    description : { type : String , required : true},
    price : {type : Number , required : true , default : 0},
    instructor : {
        type: Schema.ObjectId,
        ref : 'User',
        required : true,
    },
    category : {
        type : Schema.ObjectId,
        ref : 'Category',
        required : true,
    },
    enrolledStudents : {
        type : Schema.ObjectId,
        ref : 'User',
    }
},{timestamps : true});

const Course = mongoose.model('Course',CourseSchema);

export default Course;
