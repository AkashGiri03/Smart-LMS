import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]); // 🔥 IMPORTANT
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyCourses = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/courses/my-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("My courses API response:", res.data);
      setCourses(res.data);
    };

    fetchMyCourses();
  }, []);

  if (courses.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>No enrolled courses yet</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">My Courses</h2>

      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold">{course.title}</h5>
                <p className="text-muted">₹{course.price}</p>

                <Link
                  to={`/learn/${course._id}`}
                  className="btn btn-primary w-100 mt-2"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
