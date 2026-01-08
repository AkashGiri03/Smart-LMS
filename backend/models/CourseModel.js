import mongoose from "mongoose";
const { Schema } = mongoose;


// lesson schema 
const lessonSchema = new Schema({
    title : { type : String , require: true},
    videoUrl : { type : String , required : true},
})

// module schema
const moduleSchema = new Schema({
    title : { type : String , required : true},
    lessons : [lessonSchema],
})




// const CourseSchema = new Schema({
//     title : { type: String , required : true},
//     description : { type : String , required : true},
//     price : {type : Number , required : true , default : 0},
//     instructor : {
//         type: Schema.ObjectId,
//         ref : 'User',
//         required : true,
//     },
//     category : {
//         type : Schema.ObjectId,
//         ref : 'Category',
//         required : true,
//     },
//     enrolledStudents : {
//         type : Schema.ObjectId,
//         ref : 'User',
//     }
// },{timestamps : true});

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // 🔥 FIXED: ARRAY, NOT SINGLE VALUE
    enrolledStudents: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 🔥 REQUIRED FOR LEARNING FLOW
    modules: [moduleSchema],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course',CourseSchema);

export default Course;
