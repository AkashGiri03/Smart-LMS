import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// const BACKENDURL = import.meta.env.VITE_API_BASE;

export default function LearnCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/courses/learn/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("LEARN COURSE API RESPONSE:", res.data);

        setCourse(res.data);
        

        // auto select first lesson
        const firstLesson = res.data.modules?.[0]?.lessons?.[0];

        if (firstLesson) setActiveLesson(firstLesson);
      } catch (err) {
        if (err.response?.status === 403) {
          navigate("/courses");
        }
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT SIDEBAR */}
        <div className="col-md-3 border-end">
          {course.modules.length === 0 ? (
            <p className="text-muted mt-3">No lessons available yet.</p>
          ) : (
            course.modules.map((module, mIndex) => (
              <div key={mIndex}>
                <h6 className="fw-bold mt-3">{module.title}</h6>
                <ul className="list-unstyled">
                  {module.lessons.map((lesson, lIndex) => (
                    <li
                      key={lIndex}
                      className="cursor-pointer text-primary"
                      onClick={() => setActiveLesson(lesson)}
                    >
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-md-9 p-4">
          {activeLesson ? (
            <>
              <h4>{activeLesson.title}</h4>
              <video src={activeLesson.videoUrl} controls width="100%" />
            </>
          ) : (
            <p>Select a lesson</p>
          )}
        </div>
      </div>
    </div>
  );
}
