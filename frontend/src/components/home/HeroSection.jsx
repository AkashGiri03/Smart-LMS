import { Link } from "react-router-dom";
import hero_illustration from "../../assets/hero_illustration.svg";

const HeroSection = () =>{
    return(
        <>
        <section className="hero-section d-flex align-items-center text-white">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-4 fw-bold mb-3 animate-fade">
                Upgrade Your Skills with{" "}
                <span className="text-warning">Smart LMS</span>
              </h1>
              <p className="lead mb-4">
                Learn anytime, anywhere with interactive, high-quality online
                courses created by industry experts.
              </p>

              <div className="d-flex gap-3">
                <Link
                  to="/courses"
                  className="btn btn-warning btn-lg px-4 py-2"
                >
                  Browse Courses
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline-light btn-lg px-4 py-2"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-md-6 text-center">
              <img
                src={hero_illustration}
                alt="Learning Illustration"
                className="img-fluid hero-img animate-fade"
              />
            </div>
          </div>
        </div>
      </section>
        </>
    )
}

export default HeroSection;