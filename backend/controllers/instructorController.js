import Course from "../models/CourseModel.js";

export const getInstructorCourses = async (req, res) => {
  const courses = await Course.find({
    instructor: req.user._id,
  });

  res.json(courses);
};


export const createCourse = async (req, res) => {
  const { title, description, price, category } = req.body;

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  const course = await Course.create({
    title,
    description,
    price,
    category,
    instructor: req.user._id,
  });

  res.status(201).json(course);
};



export const addModule = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const course = await Course.findOne({
    _id: id,
    instructor: req.user._id,
  });

  if (!course)
    return res.status(404).json({ message: "Course not found" });

  course.modules.push({ title, lessons: [] });
  await course.save();

  res.json(course);
};


export const addLesson = async (req, res) => {
  const { courseId, moduleIndex } = req.params;
  const { title, videoUrl, pdfUrl } = req.body;

  const course = await Course.findOne({
    _id: courseId,
    instructor: req.user._id,
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const module = course.modules[moduleIndex];
  if (!module) {
    return res.status(404).json({ message: "Module not found" });
  }

  module.lessons.push({
    title,
    videoUrl,
    pdfUrl,
  });

  await course.save();
  res.json(course);
};


// deleting module and lessons for instructor

export const deleteModule = async (req, res) => {
  const { courseId, moduleIndex } = req.params;

  const course = await Course.findOne({
    _id: courseId,
    instructor: req.user._id,
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (!course.modules[moduleIndex]) {
    return res.status(404).json({ message: "Module not found" });
  }

  course.modules.splice(moduleIndex, 1);

  await course.save();
  res.json(course);
};


export const deleteLesson = async (req, res) => {
  const { courseId, moduleIndex, lessonIndex } = req.params;

  const course = await Course.findOne({
    _id: courseId,
    instructor: req.user._id,
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const module = course.modules[moduleIndex];
  if (!module) {
    return res.status(404).json({ message: "Module not found" });
  }

  if (!module.lessons[lessonIndex]) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  module.lessons.splice(lessonIndex, 1);

  await course.save();
  res.json(course);
};
