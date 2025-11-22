import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import "../App.css";
import hero_illustration from "../assets/hero_illustration.svg";

export default function Home() {
  const featuredCourses = [
    {
      title: "React.js Fundamentals: From Zero to Hero",
      description: "Master React components, hooks, and real-world apps.",
      students: 120,
      price: "$49",
      rating: "4.7",
      instructor: "John Doe",
      category: "Web Development",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.EntHChgUyirgbZ9A3zTxkAHaFj%3Fpid%3DApi&f=1&ipt=d2b300d67ccfa825c6c511b54b63c4d0b234f2ab27eb492907aac6551b60eeb6&ipo=images",
      link: "/courses/react-basics",
    },
    {
      title: "Node.js Backend Development Mastery",
      description: "Create scalable backend APIs using Express and MongoDB.",
      students: 80,
      price: "$59",
      rating: "4.8",
      instructor: "Sarah Smith",
      category: "Web Development",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp5070716.jpg&f=1&nofb=1&ipt=64491b69a0be9337b26dabb8d87201cf72a4a0740cc103ab252c53b19a2f3ec9",
      link: "/courses/nodejs-fundamentals",
    },
    {
      title: "UX/UI Design: Creating Intuitive Experiences",
      description: "Wireframing, prototyping, visual theory & design systems.",
      students: 65,
      price: "$45",
      rating: "4.6",
      instructor: "Alex Brown",
      category: "Design",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3sniff.com%2Fcommon%2Farticle%2Fui-ux-design1.jpg&f=1&nofb=1&ipt=26048dbc42fb331811996f5c37d430c3e2ffb006f7a12e235d0fa811409dbc40",
      link: "/courses/ux-ui-design",
    },
  ];

  const categories = [
    {
      name: "Web Development",
      link: "/categories/web",
      startColor: "#6a11cb",
      endColor: "#2575fc",
      image:
        "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/code-slash.svg",
      courseCount: 24,
    },
    {
      name: "Data Science",
      link: "/categories/data",
      startColor: "#ff512f",
      endColor: "#dd2476",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/bar-chart.svg",
      courseCount: 18,
    },
    {
      name: "Design",
      link: "/categories/design",
      startColor: "#f7971e",
      endColor: "#ffd200",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/brush.svg",
      courseCount: 12,
    },
    {
      name: "Marketing",
      link: "/categories/marketing",
      startColor: "#56ab2f",
      endColor: "#a8e063",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/megaphone.svg",
      courseCount: 8,
    },
    {
      name: "Business",
      link: "/categories/business",
      startColor: "#ff4b1f",
      endColor: "#ff9068",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/briefcase.svg",
      courseCount: 15,
    },
    {
      name: "Personal Development",
      link: "/categories/personal",
      startColor: "#00c6ff",
      endColor: "#0072ff",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/person.svg",
      courseCount: 10,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
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

      {/* Browse Categories Section */}
      <section className="container my-5">
        <h2 className="mb-4 text-center">Browse Categories</h2>
        <div className="row g-4">
          {categories.map((cat, index) => (
            <div className="col-6 col-md-4 col-lg-2 text-center" key={index}>
              <Link
                to={cat.link}
                className="category-card-gradient d-flex flex-column align-items-center justify-content-center p-4 rounded text-decoration-none text-white h-100"
                style={{
                  background: `linear-gradient(135deg, ${cat.startColor}, ${cat.endColor})`,
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="mb-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                  }}
                />
                <span className="fw-semibold mb-1">{cat.name}</span>
                <small>{cat.courseCount} Courses</small>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section
        className="py-5"
        style={{ backgroundColor: "#f8f9fa" }} // light whitish background
      >
        <div className="container">
          <h2 className="mb-2 text-center">Featured Courses</h2>
          <p className="text-center text-muted mb-4 fst-italic">
            Hand-picked courses to start your learning journey
          </p>

          <div className="row g-4">
            {featuredCourses.map((course, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <Link
                  to={course.link}
                  className="text-decoration-none text-dark"
                >
                  <div
                    className="card h-100 rounded overflow-hidden shadow-lg border-0 position-relative"
                    style={{ transition: "0.3s" }}
                  >
                    {/* Category Tag */}
                    <span
                      className="badge bg-primary position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                        padding: "8px 12px",
                        fontSize: "0.75rem",
                        zIndex: 2,
                      }}
                    >
                      Course Category: {course.category}
                    </span>

                    {/* Image */}
                    <img
                      src={course.image}
                      className="card-img-top"
                      alt={course.title}
                      style={{ height: "180px", objectFit: "cover" }}
                    />

                    <div className="card-body d-flex flex-column">
                      {/* Title */}
                      <h5 className="card-title fw-semibold">{course.title}</h5>

                      {/* Description */}
                      <p className="card-text flex-grow-1 text-muted">
                        {course.description}
                      </p>

                      {/* Rating + Instructor */}
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-warning fw-bold">
                          ⭐ {course.rating}
                        </span>
                        <small className="text-muted">
                          {course.instructor}
                        </small>
                      </div>

                      {/* Price BELOW rating */}
                      <div className="mt-2">
                        <span className="fw-bold text-success fs-5">
                          {course.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* View All Courses Button */}
          <div className="text-center mt-4">
            <Link to="/courses" className="btn btn-primary btn-lg px-4">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Smart LMS Section */}
      <section className="py-5" style={{ background: "#ffffff" }}>
        <div className="container">
          <h2 className="text-center mb-3">Why Choose Smart LMS?</h2>
          <p className="text-center text-muted mb-5 fst-italic">
            Experience a smarter way to learn with features designed for every
            learner
          </p>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card p-4 text-center h-100 rounded-4 shadow-sm">
                <i className="bi bi-award fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold mb-2">Expert Instructors</h5>
                <p className="text-muted">
                  Learn from industry professionals with years of teaching and
                  real-world experience.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card p-4 text-center h-100 rounded-4 shadow-sm">
                <i className="bi bi-play-circle fs-1 text-success mb-3"></i>
                <h5 className="fw-bold mb-2">Interactive Lessons</h5>
                <p className="text-muted">
                  Engaging videos, quizzes, assignments, and hands-on projects
                  to enhance your learning.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card p-4 text-center h-100 rounded-4 shadow-sm">
                <i className="bi bi-phone fs-1 text-warning mb-3"></i>
                <h5 className="fw-bold mb-2">Learn Anywhere</h5>
                <p className="text-muted">
                  Access all courses on mobile, tablet, or desktop — learn at
                  your own pace, anytime.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card p-4 text-center h-100 rounded-4 shadow-sm">
                <i className="bi bi-patch-check fs-1 text-danger mb-3"></i>
                <h5 className="fw-bold mb-2">Certificates of Completion</h5>
                <p className="text-muted">
                  Earn industry-recognized certificates to showcase your skills
                  and boost your career.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="text-center py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #007bff 0%, #6610f2 100%)",
        }}
      >
        <div className="container">
          <h2 className="display-5 fw-bold mb-2">Ready to Start Now?</h2>
          <h3 className="mb-4">Join thousands of learners today!</h3>
          <Link to="/login" className="btn btn-light btn-lg px-4 py-2">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
