import Course from "../models/CourseModel.js";
import Order from "../models/Order.js";


// export const getCourse = async (req, res) => {
//   try {
//     //fetch the Courses from the database
//     const courses = await Course.find({})
//       .populate("category", "name")
//       .populate("instructor", "name");
//     return res.status(200).json(courses);
//   } catch (error) {
//     return res.status(500).json({ message: "Server error!" });
//   }
// };
export const getCourse = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    // --------------------------
    // Title filter (keyword)
    // --------------------------
    const titleFilter = keyword
      ? { title: { $regex: keyword, $options: "i" } }
      : {};

    // --------------------------
    // Category filter
    // - If frontend sends category name → match by name
    // - If frontend sends category ID   → match directly
    // --------------------------
    let categoryFilter = {};

    if (category) {
      // Check if category is a valid MongoDB ObjectId
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(category);

      if (isObjectId) {
        categoryFilter = { category };
      } else {
        // If category is a NAME, convert it to ID
        const foundCat = await Category.findOne({ name: category });
        if (foundCat) {
          categoryFilter = { category: foundCat._id };
        }
      }
    }

    // Final filter
    const finalFilter = { ...titleFilter, ...categoryFilter };

    // Fetch courses
    const courses = await Course.find(finalFilter)
      .populate("category", "name")
      .populate("instructor", "name");

    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    //fetch the Courses from the database
    const course = await Course.findById(req.params.id)
      .populate("category", "name")
      .populate("instructor", "name");

    if (!course) {
      return res.status(404).json({ message: " Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
};

export const enrollStudentInCourse = async (req, res) => {
  try {
    //enroll user into course
    //course id in req
    // fetch the courses from the database

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(400).json({ message: "Course not found!" });
    }

    //validate if user already purchased
    if (course.enrolledStudents.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in the course!" });
    }

    //update/inset user id into enrolledStudents
    course.enrolledStudents.push(req.user._id);

    //update database
    await course.save();

    return res.status(200).json({ message: "User is enrolled in course!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
};


//fetch enrolled user courses
export const myCourses = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      paymentStatus: "PAID",
    }).populate("items.course");

    // collect unique courses
    const coursesMap = new Map();

    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.course) {
          coursesMap.set(
            item.course._id.toString(),
            item.course
          );
        }
      });
    });

    const courses = Array.from(coursesMap.values());

    return res.status(200).json(courses);
  } catch (error) {
    console.error("myCourses error:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};



// extracting the owned course 
export const ownedCourses = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      paymentStatus: "PAID",
    });

    const ownedCourseIds = new Set();

    orders.forEach(order => {
      order.items.forEach(item => {
        ownedCourseIds.add(item.course.toString());
      });
    });

    return res.status(200).json({
      ownedCourseIds: Array.from(ownedCourseIds),
    });
  } catch (error) {
    console.error("ownedCourses error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// accessing the course for lesson 

export const getCourseForLearning = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // 🔐 ACCESS CHECK (NON-NEGOTIABLE)
    const hasAccess = await Order.findOne({
      user: userId,
      paymentStatus: "PAID",
      "items.course": courseId,
    });

    if (!hasAccess) {
      return res.status(403).json({
        message: "You are not enrolled in this course",
      });
    }

    // 📦 FETCH COURSE WITH MODULES + LESSONS
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (err) {
    console.error("getCourseForLearning error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
