import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");


  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE}/api/instructor/courses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Instructor Dashboard</h2>
        <Link to="/instructor/courses/new" className="btn btn-primary">
          + Create Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <p className="text-muted">No courses created yet.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 mb-3" key={course._id}>
              <div className="card shadow-sm p-3">
                <h5 className="fw-bold">{course.title}</h5>
                <p className="text-muted small">
                  ₹{course.price}
                </p>
                <Link
                  to={`/instructor/courses/${course._id}/edit`}
                  className="btn btn-outline-primary btn-sm"
                >
                  Manage Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
