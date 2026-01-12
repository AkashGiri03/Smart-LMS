import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // ✅ EXISTING (DO NOT TOUCH)
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "student",
      enum: ["student", "instructor", "admin"],
    },

    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    // ✅ NEW FIELDS (PROFILE)
    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
