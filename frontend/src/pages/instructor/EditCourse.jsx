import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function EditCourse() {
  const [lessonForms, setLessonForms] = useState({});
  const navigate = useNavigate();

  //   const [activeModule, setActiveModule] = useState(null);

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [course, setCourse] = useState(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const addLesson = async (moduleIndex) => {
    const form = lessonForms[moduleIndex];

    if (!form?.title || !form?.videoUrl) return;

    const res = await axios.post(
      `${
        import.meta.env.VITE_API_BASE
      }/api/instructor/courses/${id}/modules/${moduleIndex}/lessons`,
      {
        title: form.title,
        videoUrl: form.videoUrl,
        pdfUrl: form.pdfUrl,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCourse(res.data);

    // clear only that module's form
    setLessonForms((prev) => ({
      ...prev,
      [moduleIndex]: { title: "", videoUrl: "", pdfUrl: "" },
    }));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourse(res.data));
  }, [id]);

  const addModule = async () => {
    if (!moduleTitle.trim()) return;

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE}/api/instructor/courses/${id}/modules`,
      { title: moduleTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCourse(res.data);
    setModuleTitle("");
  };

  const deleteModule = async (moduleIndex) => {
    if (!window.confirm("Delete this module and all its lessons?")) return;

    const res = await axios.delete(
      `${
        import.meta.env.VITE_API_BASE
      }/api/instructor/courses/${id}/modules/${moduleIndex}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCourse(res.data);
  };

  const deleteLesson = async (moduleIndex, lessonIndex) => {
    if (!window.confirm("Delete this lesson?")) return;

    const res = await axios.delete(
      `${
        import.meta.env.VITE_API_BASE
      }/api/instructor/courses/${id}/modules/${moduleIndex}/lessons/${lessonIndex}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCourse(res.data);
  };

  const deleteCourse = async () => {
    if (
      !window.confirm(
        "This will permanently delete the course and ALL its modules and lessons. Continue?"
      )
    )
      return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE}/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // redirect after delete
      navigate("/instructor/courses");

    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  const uploadFile = async (file, type, moduleIndex) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    setUploading(true);

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE}/api/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setLessonForms((prev) => ({
      ...prev,
      [moduleIndex]: {
        ...prev[moduleIndex],
        [`${type}Url`]: res.data.url,
      },
    }));

    setUploading(false);
  };

  if (!course) return <div className="container mt-5">Loading…</div>;

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">{course.title}</h2>

      <div className="mb-4">
        <h5>Add Module</h5>
        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="Module title"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addModule}>
            Add
          </button>
        </div>
      </div>

      <hr />

      {course.modules.map((module, mIndex) => (
        <div key={mIndex} className="mb-4 border p-3 rounded">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0">{module.title}</h6>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteModule(mIndex)}
            >
              Delete Module
            </button>
          </div>

          {/* EXISTING LESSONS */}
          <ul className="small">
            {module.lessons.map((lesson, lIndex) => (
              <li
                key={lIndex}
                className="d-flex justify-content-between align-items-center mb-1"
              >
                <span>{lesson.title}</span>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteLesson(mIndex, lIndex)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          {/* ADD LESSON FORM */}
          <div className="mt-2">
            <input
              className="form-control mb-2"
              placeholder="Lesson title"
              value={lessonForms[mIndex]?.title || ""}
              onChange={(e) =>
                setLessonForms((prev) => ({
                  ...prev,
                  [mIndex]: {
                    ...prev[mIndex],
                    title: e.target.value,
                  },
                }))
              }
            />

            <input
              type="file"
              accept="video/*"
              className="form-control mb-2"
              onChange={(e) => uploadFile(e.target.files[0], "video", mIndex)}
            />

            <input
              type="file"
              accept="application/pdf"
              className="form-control mb-2"
              onChange={(e) => uploadFile(e.target.files[0], "pdf", mIndex)}
            />

            {uploading && <small>Uploading...</small>}

            <button
              className="btn btn-sm btn-success"
              onClick={() => addLesson(mIndex)}
            >
              Add Lesson
            </button>
          </div>
        </div>
      ))}

      <hr />

      <div className="mt-5 mb-5 p-3 border border-danger rounded">
        <p className="small text-muted">
          Deleting a course is permanent and cannot be undone.
        </p>

        <button className="btn btn-danger" onClick={deleteCourse}>
          Delete Course
        </button>
      </div>
    </div>
  );
}
