import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const featuredCourses = [
    { title: "React Basics", description: "Learn React from scratch", students: 120 },
    { title: "Node.js Fundamentals", description: "Build backend APIs", students: 80 },
    { title: "Bootstrap 5", description: "Responsive UI Design", students: 60 },
  ];

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to SmartLMS</h1>
          <p className="lead">Learn anytime, anywhere, at your own pace</p>
          <Link to="/courses" className="btn btn-light btn-lg mt-3">Browse Courses</Link>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mt-5">
        <h2 className="mb-4">Featured Courses</h2>
        <div className="row">
          {featuredCourses.map((course, index) => (
            <div className="col-md-4" key={index}>
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-light text-center py-5 mt-5">
        <div className="container">
          <h3>Join thousands of learners today!</h3>
          <Link to="/login" className="btn btn-primary btn-lg mt-3">Get Started</Link>
        </div>
      </section>

    </div>
  );
}
