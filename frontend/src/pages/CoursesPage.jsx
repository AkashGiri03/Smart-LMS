import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard.jsx";
import CategorySidebar from "../components/CategorySidebar.jsx";

export default function CoursesPage() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const backendURL = "http://localhost:3002/api";

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/category`);
      setCategories(data);
    } catch (error) {
      console.log("Category fetch failed", error);
    }
  };

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/courses`);
      setCourses(data);
      setFiltered(data);
    } catch (error) {
      console.log("Course fetch failed", error);
    }
  };

  // Filter when category changes
  useEffect(() => {
    if (selectedCategory === null) {
      setFiltered(courses);
    } else {
      setFiltered(courses.filter(c => c.category?._id === selectedCategory));
    }
  }, [selectedCategory, courses]);

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  // 🔥 BUILD COURSE COUNTS HERE
  const courseCounts = {
    all: courses.length,
  };

  courses.forEach((c) => {
    const catId = c.category?._id;
    if (!courseCounts[catId]) courseCounts[catId] = 0;
    courseCounts[catId] += 1;
  });

  return (
    <div className="container my-5">
      <div className="row">

        {/* LEFT SIDEBAR */}
        <div className="col-md-3 mb-4">
          <CategorySidebar
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            courseCounts={courseCounts}
          />
        </div>

        {/* RIGHT SIDE COURSES */}
        <div className="col-md-9">
          <h3 className="mb-3 fw-bold">
            {selectedCategory ? "Filtered Courses" : "All Courses"}
          </h3>

          <div className="row g-4">
            {filtered.length > 0 ? (
              filtered.map((course) => (
                <div className="col-md-4" key={course._id}>
                  <CourseCard course={course} />
                </div>
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
