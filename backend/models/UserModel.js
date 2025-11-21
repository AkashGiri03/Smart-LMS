import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name : { type: String , required : true},
    email : { type : String , required : true , unique : true},
    password : {type : String , required : true },
    role : { type : String ,default: 'student', enum : [ 'student' , 'instructor' , 'admin']},
});

const User = mongoose.model('User',userSchema);

export default User;
