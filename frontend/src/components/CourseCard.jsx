import { Link } from "react-router-dom";
import { useId } from "react";

/* ---------- STAR ---------- */
const Star = ({ type }) => {
  const gradientId = useId();
  const path =
    "M12 .587l3.668 7.568L24 9.423l-6 5.845 1.417 8.232L12 18.896 4.583 23.5 6 15.268 0 9.423l8.332-1.268z";

  if (type === "full") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d={path} fill="#f5c518" />
      </svg>
    );
  }

  if (type === "half") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="#f5c518" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill={`url(#${gradientId})`}
          stroke="#f5c518"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d={path} fill="none" stroke="#999" strokeWidth="1.5" />
    </svg>
  );
};

/* ---------- RATING ---------- */
const RatingStars = ({ rating = 0 }) => {
  const safe = Number(rating) || 0;
  const full = Math.floor(safe);
  const half = safe % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div style={{ fontSize: "18px", lineHeight: "1" }}>
      {[...Array(full)].map((_, i) => (
        <span key={`f-${i}`} style={{ color: "#f5c518" }}>
          ★
        </span>
      ))}

      {half && <span style={{ color: "#f5c518" }}>☆</span>}

      {[...Array(empty)].map((_, i) => (
        <span key={`e-${i}`} style={{ color: "#999" }}>
          ★
        </span>
      ))}
    </div>
  );
};

/* ---------- COURSE CARD ---------- */
const CourseCard = ({ course }) => {
  return (
    <div
      className="card shadow-sm border-0 h-100"
      style={{ borderRadius: "14px", overflow: "hidden" }}
    >
      {/* IMAGE */}
      <div style={{ height: "160px", background: "#eee" }}>
        <img
          src={
            course.thumbnail ||
            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d"
          }
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* BODY */}
      <div className="card-body d-flex flex-column">
        <span className="badge bg-primary mb-2 align-self-start">
          {course.category?.name}
        </span>

        <h5 className="fw-bold mb-1">{course.title}</h5>

        {/* RATING */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="fw-semibold">
            {Number(course.rating || 0).toFixed(1)}
          </span>

          {course.totalReviews > 0 ? (
            <RatingStars rating={course.rating} />
          ) : (
            <span className="text-muted small">No ratings yet</span>
          )}
        </div>

        <p className="text-muted small mb-2">
          {course.description?.substring(0, 70)}...
        </p>

        <p className="small fw-semibold mb-3">👨‍🏫 {course.instructor?.name}</p>

        {/* PRICE */}
        <div className="mt-auto">
          <span className="fw-bold fs-5 text-success">₹{course.price}</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="card-footer bg-white border-0 pt-0 pb-3">
        <Link to={`/course/${course._id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
