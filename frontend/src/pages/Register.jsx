import { Link } from "react-router-dom";
import illustration from "../assets/illustration.svg";

export default function Register() {
  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div className="row d-flex align-items-center justify-content-center flex-grow-1">
        {/* LEFT — Illustration */}
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <img
            src={illustration}
            alt="Register Illustration"
            className="img-fluid"
            style={{ maxWidth: "450px" }}
          />
        </div>

        {/* RIGHT — Register Form */}
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
            <h2 className="text-center mb-4 fw-bold text-primary">Create Your Account</h2>

            <form>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-dark">
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label text-dark">
                  Confirm Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="form-check text-white mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  required
                />
                <label htmlFor="terms" className="form-check-label">
                  I agree to the <Link to="/terms" className="text-primary">Terms & Conditions</Link>
                </label>
              </div>

              {/* Register Button */}
              <button className="btn btn-primary w-100 fw-bold py-2">
                Register
              </button>
            </form>

            <p className="text-center mt-3 text-dark">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
