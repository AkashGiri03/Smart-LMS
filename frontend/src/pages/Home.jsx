import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import "../App.css";
import FeaturedSection from "../components/home/FeaturedSection.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import BrowseCategory from "../components/home/BrowseCategory.jsx";
import WhyChosesec from "../components/home/WhyChosesec.jsx";

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

  

  return (
    <div>
      {/* Hero Section */}
      <HeroSection/>

      {/* Browse Categories Section */}
      <BrowseCategory/>

      {/* Featured Courses */}
      <FeaturedSection courses={featuredCourses} />

      {/* Why Choose Smart LMS Section */}
      <WhyChosesec/>

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
