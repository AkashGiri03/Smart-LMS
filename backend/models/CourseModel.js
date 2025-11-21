import mongoose from "mongoose";
const { Schema } = mongoose;

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
    }
});

const Course = mongoose.model('Course',CourseSchema);

export default Course;
