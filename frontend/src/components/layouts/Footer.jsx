import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        {/* Top section */}
        <div className="row align-items-start">
          {/* Brand */}
          <div className="col-md-3 mb-3 mb-md-0">
            <h4 className="fw-bold">
              Smart<span className="text-primary">LMS</span>
            </h4>
            <p className="small">
              Your platform for smart learning and skill development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-3 mb-md-0">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-light text-decoration-none">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-md-3 mb-3 mb-md-0">
            <h6 className="fw-bold">Contact Us</h6>
            <ul className="list-unstyled mt-2 small">
              <li>
                <i className="bi bi-geo-alt-fill me-2"></i>123 LMS Street, City,
                Country
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2"></i>+1 234 567 890
              </li>
              <li>
                <i className="bi bi-envelope-fill me-2"></i>support@smartlms.com
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div class="col-md-3 mb-3 mb-md-0">
            <h6 class="fw-bold">Follow Us</h6>
                          <div class="d-flex gap-3 mt-2">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-light fs-5 p-2"
                >
                  <i class="bi bi-facebook"></i>
                </a>
              
                <a
                  href="https://x.com/?lang=en-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-light fs-5 p-2"
                >
                  <i class="bi bi-twitter"></i>
                </a>
              
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-light fs-5 p-2"
                >
                  <i class="bi bi-instagram"></i>
                </a>
              
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-light fs-5 p-2"
                >
                  <i class="bi bi-linkedin"></i>
                </a>
              </div>

          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom */}
        <div className="text-center small">
          &copy; {new Date().getFullYear()} SmartLMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
