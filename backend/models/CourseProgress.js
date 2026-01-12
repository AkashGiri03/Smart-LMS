import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedLessons: [
      {
        moduleIndex: Number,
        lessonIndex: Number,
      },
    ],

    lastLesson: {
      moduleIndex: Number,
      lessonIndex: Number,
    },

    progressPercent: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CourseProgress", courseProgressSchema);
