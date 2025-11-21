import mongoose from "mongoose";

const connectdb = async()=>{

    try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected successfully");
    } catch (error) {
    console.log(error);
    }

}

export default connectdb;


