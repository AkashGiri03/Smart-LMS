import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "student",
    enum: ["student", "instructor", "admin"],
  },

  // 🔥 THIS IS WHAT WAS MISSING
  enrolledCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
