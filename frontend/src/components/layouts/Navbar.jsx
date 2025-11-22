import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

export default function Navbar() {
  const collapseRef = useRef(null);

  useEffect(() => {
    // Initialize collapse manually
    const collapseEl = collapseRef.current;
    if (collapseEl) {
      new bootstrap.Collapse(collapseEl, { toggle: false });
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 sticky-top">
      <div className="container">

        {/* Brand on the left */}
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

          {/* Centered Links */}
          <ul className="navbar-nav mx-auto mb-0 gap-3">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>

          {/* Right-aligned Buttons */}
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-light px-3">Login</Link>
            <Link to="/register" className="btn btn-primary px-3">Sign Up</Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
