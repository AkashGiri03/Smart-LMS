import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [progressData, setProgressData] = useState([]);
  const [tab, setTab] = useState("all");

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/progress/my-courses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProgressData(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;

  const allCourses = progressData;
  const inProgress = progressData.filter((c) => !c.completed);
  const completed = progressData.filter((c) => c.completed);

  const visibleCourses =
    tab === "all" ? allCourses : tab === "progress" ? inProgress : completed;

  return (
  <div className="container mt-5 mb-5">
    <h2 className="fw-bold mb-4">My Learning</h2>

    {/* Tabs */}
    <ul className="nav nav-tabs mb-4">
      <li className="nav-item">
        <button
          className={`nav-link ${tab === "all" ? "active" : ""}`}
          onClick={() => setTab("all")}
        >
          All Courses ({allCourses.length})
        </button>
      </li>

      <li className="nav-item">
        <button
          className={`nav-link ${tab === "progress" ? "active" : ""}`}
          onClick={() => setTab("progress")}
        >
          In Progress ({inProgress.length})
        </button>
      </li>

      <li className="nav-item">
        <button
          className={`nav-link ${tab === "completed" ? "active" : ""}`}
          onClick={() => setTab("completed")}
        >
          Completed ({completed.length})
        </button>
      </li>
    </ul>

    {/* Course List */}
    {visibleCourses.length === 0 ? (
      <div className="text-center mt-5">
        <h5>
          {tab === "completed"
            ? "No completed courses yet."
            : tab === "progress"
            ? "No courses in progress."
            : "You haven’t enrolled in any courses yet."}
        </h5>
        <Link to="/courses" className="btn btn-primary mt-3">
          Browse Courses
        </Link>
      </div>
    ) : (
      <div className="d-flex flex-column gap-4">
        {visibleCourses.map((item) => {
          const course = item.course;

          return (
            <div
              key={course._id}
              className="card shadow-sm p-3 d-flex flex-row gap-4"
              style={{ borderRadius: "12px" }}
            >
              {/* Thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                alt="course"
                style={{
                  width: "220px",
                  height: "130px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              {/* Info */}
              <div className="flex-grow-1 d-flex flex-column">
                <h5 className="fw-bold mb-1">{course.title}</h5>
                <p className="text-muted small mb-2">By Smart LMS</p>

                {/* Progress */}
                <div className="progress mb-2" style={{ height: "6px" }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>

                <span className="text-muted small mb-3">
                  {item.progressPercent}% Complete
                </span>

                <Link
                  to={`/learn/${course._id}`}
                  className="btn btn-primary fw-bold align-self-start"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

}
