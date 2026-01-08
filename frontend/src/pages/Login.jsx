import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import illustration from "../assets/illustration.svg";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext.jsx";
import { mergeCartAfterLogin } from "../utils/mergeCart.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { setCartItems } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // login
      const token = await login(form.email, form.password);

      // fire-and-forget
      mergeCartAfterLogin(token, setCartItems).catch(console.error);

      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div
      className="d-flex flex-column login-bg"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <div className="row d-flex align-items-center justify-content-center">
        {/* LEFT — Illustration */}
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <img
            src={illustration}
            alt="Login Illustration"
            className="img-fluid"
            style={{ maxWidth: "450px" }}
          />
        </div>

        {/* RIGHT — Login Form */}
        <div className="col-md-5 d-flex justify-content-center">
          <div
            className="card p-4 shadow-lg"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "12px",
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            <h2 className="text-center mb-4 fw-bold text-primary">
              Login to SmartLMS
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-dark">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-dark">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Extras */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check text-dark">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                  />
                  <label htmlFor="remember" className="form-check-label">
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="text-primary small">
                  Forgot password?
                </Link>
              </div>

              {/* Button */}
              <button className="btn btn-primary w-100 fw-bold">Login</button>
            </form>

            <p className="text-center mt-3 text-dark">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
