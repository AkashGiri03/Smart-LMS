import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/category`)
      .then((res) => setCategories(res.data))
      .catch(() => alert("Failed to load categories"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/instructor/courses`,
        { title, description, price, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Course created");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }

    navigate("/instructor/dashboard");
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold mb-4">Create New Course</h2>

      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="mb-3">
          <label className="form-label">Course Title</label>
          <input
            className="form-control"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button className="btn btn-primary fw-bold">Create Course</button>
      </form>
    </div>
  );
}
