import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3002/api/courses/${id}`
        );
        setCourse(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error || !course)
    return (
      <div className="text-center mt-5 text-danger">Course not found.</div>
    );

  // Fallback sample data (until you store these fields in DB)
  const level = course.level || "Beginner";
  const requirements = course.requirements || [
    "No prior experience required",
    "A laptop with internet connection",
    "Willingness to learn step-by-step",
  ];

  const courseContent = course.content || [
    "Introduction to the fundamentals and basic concepts.",
    "Deep dive into intermediate topics with hands-on assignments.",
    "Advanced real-world project building and debugging.",
    "Final assessment and deployment strategies.",
  ];

  return (
    <div className="container py-5">
      {/* Page Heading */}
      <div className="mb-4">
        <h1 className="fw-bold">{course.title}</h1>
        <p className="text-secondary">
          {course.category?.name} • {level} Level
        </p>
      </div>

      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-lg-8">
          {/* Requirements */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Requirements</h4>
              <ul className="text-muted">
                {requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Description */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Description</h4>
              <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                {course.description}
              </p>
            </div>
          </div>

          {/* Course Content */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Course Content</h4>
              {courseContent.map((para, i) => (
                <p key={i} className="text-muted">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="card shadow-sm mb-4">
            <div className="card-body d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: "60px", height: "60px", fontSize: "24px" }}
              >
                {course.instructor?.name?.charAt(0)}
              </div>

              <div>
                <h5 className="fw-bold mb-0">{course.instructor?.name}</h5>
                <p className="text-muted mb-0">Instructor</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Udemy Style Card (NON-STICKY) */}
<div className="col-lg-4">
  <div
    className="card shadow-sm p-4"
    style={{ borderRadius: "12px" }}
  >
    {/* Pricing */}
    <div className="d-flex align-items-end gap-2">
      <h2 className="fw-bold mb-0">₹{course.price}</h2>

      {course.originalPrice && (
        <>
          <h5 className="text-muted text-decoration-line-through mb-1">
            ₹{course.originalPrice}
          </h5>
          <span className="text-success fw-bold mb-1">
            {Math.round(
              ((course.originalPrice - course.price) / course.originalPrice) * 100
            )}% off
          </span>
        </>
      )}
    </div>

    {/* Timer */}
    <p className="text-danger small mt-2">
      <i className="bi bi-clock-history me-1"></i>
      Few hours left at this price!
    </p>

    {/* Buttons */}
    <button className="btn btn-dark w-100 py-2 fw-bold mt-3">
      Add to cart
    </button>

    <button className="btn btn-outline-dark w-100 py-2 fw-bold mt-3">
      Buy now
    </button>

    {/* Guarantee */}
    <p className="text-center text-muted small mt-3">
      30-Day Money-Back Guarantee
    </p>

    {/* Includes Section */}
    <h5 className="fw-bold mt-4 mb-3">This course includes:</h5>

    <ul className="list-unstyled text-muted">

      <li className="mb-2 d-flex align-items-center">
        <i className="bi bi-camera-video me-2"></i>
        {course.videoHours || "3"} hours on-demand video
      </li>

      <li className="mb-2 d-flex align-items-center">
        <i className="bi bi-file-earmark-text me-2"></i>
        {course.articles || "3"} articles
      </li>

      <li className="mb-2 d-flex align-items-center">
        <i className="bi bi-phone me-2"></i>
        Access on mobile & TV
      </li>

      <li className="mb-2 d-flex align-items-center">
        <i className="bi bi-infinity me-2"></i>
        Full lifetime access
      </li>

      <li className="mb-2 d-flex align-items-center">
        <i className="bi bi-award me-2"></i>
        Certificate of completion
      </li>

    </ul>
  </div>
</div>

      </div>
    </div>
  );
}
