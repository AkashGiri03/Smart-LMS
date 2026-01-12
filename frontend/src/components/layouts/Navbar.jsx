import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

export default function Navbar() {
  const collapseRef = useRef(null);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const collapseEl = collapseRef.current;
    if (collapseEl) {
      new bootstrap.Collapse(collapseEl, { toggle: false });
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Smart<span className="text-primary">LMS</span>
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => {
            const collapseEl = collapseRef.current;
            if (collapseEl) {
              const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
              if (bsCollapse) bsCollapse.toggle();
            }
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse */}
        <div className="collapse navbar-collapse" ref={collapseRef}>
          {/* RIGHT SIDE NAV LINKS & BUTTONS */}
          <div className="d-flex align-items-center ms-auto gap-4">
            {/* HOME + COURSES (RIGHT SIDE) */}
            <ul className="navbar-nav mb-0 gap-3 d-flex flex-row align-items-center">
              {/* HOME */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {/* COURSES */}
              <li className="nav-item">
                <Link className="nav-link" to="/courses">
                  Courses
                </Link>
              </li>

              {/* STUDENT ONLY */}
              {user?.role === "student" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      🛒 Cart ({cartItems.length})
                    </Link>
                  </li>
                </>
              )}

              {/* INSTRUCTOR ONLY */}
              {user?.role === "instructor" && (
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    to="/instructor/dashboard"
                  >
                    Instructor Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/* LOGIN / SIGNUP / LOGOUT BUTTONS */}
            <div className="d-flex gap-2">
              {!user ? (
                <>
                  <Link to="/login" className="btn btn-outline-light px-3">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary px-3">
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  {/* WELCOME MESSAGE */}
                  <Link
                    to="/profile"
                    className="text-light fw-semibold text-decoration-none"
                    style={{ cursor: "pointer" }}
                    onMouseOver={(e) => {
                      e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <img
                      src={user?.avatar || "/default-avatar.png"}
                      className="rounded-circle"
                      style={{ width: 36, height: 36 }}
                    />
                    Hi, {user.name}
                  </Link>

                  {/* LOGOUT BUTTON */}
                  <button className="btn btn-danger px-3" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
