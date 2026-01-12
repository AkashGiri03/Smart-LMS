import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LearnCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const markLessonComplete = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/progress/update`,
        {
          courseId,
          moduleIndex: activeModuleIndex,
          lessonIndex: activeLessonIndex,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  // 🔹 Fetch course content
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/courses/learn/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCourse(res.data);

        // fallback first lesson
        const firstLesson = res.data.modules?.[0]?.lessons?.[0];
        if (firstLesson) {
          setActiveLesson(firstLesson);
          setActiveModuleIndex(0);
          setActiveLessonIndex(0);
        }
      } catch (err) {
        if (err.response?.status === 403) {
          navigate("/courses");
        }
      }
    };

    fetchCourse();
  }, [courseId]);

  // 🔹 Resume last lesson
  useEffect(() => {
    if (!course) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/progress/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.lastLesson) {
          const { moduleIndex, lessonIndex } = res.data.lastLesson;
          setActiveModuleIndex(moduleIndex);
          setActiveLessonIndex(lessonIndex);
          setActiveLesson(course.modules[moduleIndex].lessons[lessonIndex]);
        }
      });
  }, [course]);

  if (!course) return <div className="p-4">Loading...</div>;

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* LEFT SIDEBAR */}
        <div className="col-md-3 border-end bg-light p-3">
          <h5 className="fw-bold">{course.title}</h5>
          <p className="text-muted small">Course Content</p>

          {course.modules.length === 0 && (
            <p className="text-muted">No lessons available yet.</p>
          )}

          {course.modules.map((module, mIndex) => (
            <div key={mIndex} className="mb-3">
              <div className="fw-semibold mb-2">
                Module {mIndex + 1}: {module.title}
              </div>

              <ul className="list-unstyled">
                {module.lessons.map((lesson, lIndex) => {
                  const isActive =
                    mIndex === activeModuleIndex &&
                    lIndex === activeLessonIndex;

                  return (
                    <li
                      key={lIndex}
                      className={`py-1 px-2 rounded cursor-pointer ${
                        isActive ? "bg-primary text-white" : "text-primary"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setActiveLesson(lesson);
                        setActiveModuleIndex(mIndex);
                        setActiveLessonIndex(lIndex);
                      }}
                    >
                      {lesson.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-md-9 p-4">
          <Link
            to="/dashboard"
            className="text-decoration-none text-primary fw-semibold"
          >
            ← Back to My Courses
          </Link>

          {activeLesson ? (
            <>
              <h4 className="mb-3">{activeLesson.title}</h4>

              <video
                controls
                src={activeLesson.videoUrl}
                className="w-100 mb-3"
              />

              {/* PDF DOWNLOAD */}
              {activeLesson.pdfUrl && (
                <a
                  href={activeLesson.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary"
                >
                  📄 Download Resources (PDF)
                </a>
              )}
            </>
          ) : (
            <p>Select a lesson</p>
          )}
        </div>
      </div>
    </div>
  );
}
