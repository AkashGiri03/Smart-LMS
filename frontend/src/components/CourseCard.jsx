import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div
      className="card shadow border-0 course-card h-100"
      style={{ borderRadius: "14px", overflow: "hidden" }}
    >
      {/* Thumbnail */}
      <div
        className="course-img"
        style={{ height: "160px", background: "#eee" }}
      >
        <img
          src={course.thumbnail || "https://via.placeholder.com/300x160"}
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Body */}
      <div className="card-body">
        <h5 className="fw-bold mb-1">{course.title}</h5>

        <span className="badge bg-primary mb-2">{course.category?.name}</span>

        <p className="text-muted small">
          {course.description?.substring(0, 70)}...
        </p>

        <p className="text-dark small fw-semibold">
          👨‍🏫 Instructor: {course.instructor?.name}
        </p>
      </div>

      {/* Footer */}
      <div className="card-footer bg-white border-0 pb-3">
        <Link to={`/course/${course._id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </div>
    </div>
  );
}
