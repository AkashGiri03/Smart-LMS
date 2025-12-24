import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import illustration from "../assets/illustration.svg";

export default function Register({ setUser, setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }
    if (!formData.terms) {
      return alert("You must agree to the terms & conditions.");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/users/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      // Save user and token like login
      if (data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Registration successful!");
      navigate("/"); // redirect to dashboard or home
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", background: "#f8f9fa", padding: "20px" }}>
      <div className="row d-flex align-items-center justify-content-center flex-grow-1">
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <img
            src={illustration}
            alt="Register Illustration"
            className="img-fluid"
            style={{ maxWidth: "450px" }}
          />
        </div>

        <div className="col-md-5 d-flex justify-content-center">
          <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px", borderRadius: "12px", backdropFilter: "blur(12px)", background: "rgba(255, 255, 255, 0.15)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "white" }}>
            <h2 className="text-center mb-4 fw-bold text-primary">Create Your Account</h2>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-dark">Full Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-dark">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-dark">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label text-dark">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
              </div>

              {/* Terms & Conditions */}
              <div className="form-check text-white mb-3">
                <input type="checkbox" className="form-check-input" id="terms" checked={formData.terms} onChange={handleChange} required />
                <label htmlFor="terms" className="form-check-label">
                  I agree to the <Link to="/terms" className="text-primary">Terms & Conditions</Link>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="text-center mt-3 text-dark">
              Already have an account? <Link to="/login" className="text-primary">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
