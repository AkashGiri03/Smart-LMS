import Course from "../models/CourseModel.js";

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


    if(!course){
        return res.status(404).json({message : " Course not found"})
    }  
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
};
