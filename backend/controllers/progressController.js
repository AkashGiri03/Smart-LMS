import CourseProgress from "../models/CourseProgress.js";
import mongoose from "mongoose";

export const updateProgress = async (req, res) => {
  const { courseId, moduleIndex, lessonIndex } = req.body;
  const userId = req.user._id;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const totalLessons = course.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  );

  let progress = await CourseProgress.findOne({
    user: userId,
    course: courseId,
  });

  if (!progress) {
    progress = await CourseProgress.create({
      user: userId,
      course: courseId,
      completedLessons: [],
      progressPercent: 0,
      completed: false,
    });
  }

  const alreadyDone = progress.completedLessons.some(
    (l) =>
      l.moduleIndex === moduleIndex &&
      l.lessonIndex === lessonIndex
  );

  if (!alreadyDone) {
    progress.completedLessons.push({ moduleIndex, lessonIndex });
  }

  progress.lastLesson = { moduleIndex, lessonIndex };

  const completedCount = progress.completedLessons.length;
  progress.progressPercent = Math.round(
    (completedCount / totalLessons) * 100
  );

  if (progress.progressPercent === 100) {
    progress.completed = true;
  }

  await progress.save();

  res.json(progress);
};



export const getProgress = async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid courseId" });
  }

  const progress = await CourseProgress.findOne({
    user: req.user._id,
    course: courseId,
  });

  res.json(progress ?? null);
};

export const myProgress = async (req, res) => {
  const progress = await CourseProgress.find({ user: req.user._id })
    .populate("course");

  res.json(progress);
};

