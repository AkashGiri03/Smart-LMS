import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutButton from "../components/CheckOutButton.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function CourseDetails() {
  const { id } = useParams();

  // 🔥 ALL HOOKS AT TOP — NO EXCEPTIONS
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ownedIds, setOwnedIds] = useState([]);

  const { addToCart, cartItems } = useCart();
  const token = localStorage.getItem("token");

  // ---------------- FETCH COURSE ----------------
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/courses/${id}`
        );
        setCourse(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // ---------------- FETCH OWNED COURSES ----------------
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/courses/owned`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOwnedIds(res.data.ownedCourseIds || []);
      })
      .catch(() => setOwnedIds([]));
  }, [token]);

  // ---------------- DERIVED STATES (SAFE) ----------------
  const isInCart =
    course &&
    cartItems.some((item) => {
      const c = item.course || item;
      return c._id === course._id;
    });

  const isPurchased = course && ownedIds.includes(course._id);

  // ---------------- EARLY RETURNS (AFTER HOOKS) ----------------
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error || !course)
    return (
      <div className="text-center mt-5 text-danger">Course not found.</div>
    );

  // ---------------- FALLBACK DATA ----------------
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

  // ---------------- UI ----------------
  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="mb-4">
        <h1 className="fw-bold">{course.title}</h1>
        <p className="text-secondary">
          {course.category?.name} • {level} Level
        </p>
      </div>

      <div className="row">
        {/* LEFT */}
        <div className="col-lg-8">
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

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Description</h4>
              <p className="text-muted">{course.description}</p>
            </div>
          </div>

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
                {course.instructor?.name?.charAt(0) || "I"}
              </div>

              <div>
                <h5 className="fw-bold mb-0">
                  {course.instructor?.name || "Instructor"}
                </h5>
                <p className="text-muted mb-0">Instructor</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-4">
          <div className="card shadow-sm p-4">
            <h2 className="fw-bold">₹{course.price}</h2>

            {/* ADD TO CART */}
            <button
              className={`btn w-100 py-2 fw-bold mt-3 ${
                isPurchased
                  ? "btn-secondary"
                  : isInCart
                  ? "btn-success"
                  : "btn-dark"
              }`}
              disabled={isPurchased || isInCart}
              onClick={() => addToCart(course)}
            >
              {isPurchased
                ? "Purchased"
                : isInCart
                ? "Added to Cart"
                : "Add to Cart"}
            </button>

            {/* BUY NOW */}
            {!isPurchased ? (
              <CheckoutButton course={course} />
            ) : (
              <button className="btn btn-success w-100 mt-3" disabled>
                Purchased
              </button>
            )}

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
