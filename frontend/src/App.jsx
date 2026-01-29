import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/layouts/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";
import Contact from "./components/layouts/ContactUs.jsx;
import CoursesPage from "./pages/CoursesPage.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/CheckOut.jsx";
import LearnCourse from "./pages/LearnCourse.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import InstructorDashboard from "./pages/instructor/InstructorDashboard.jsx";
import CreateCourse from "./pages/instructor/CreateCourse.jsx";
import EditCourse from "./pages/instructor/EditCourse.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="/learn/:courseId" element={<LearnCourse />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/instructor/dashboard"
              element={<InstructorDashboard />}
            />
            <Route path="/instructor/courses/new" element={<CreateCourse />} />
            <Route
              path="/instructor/courses/:id/edit"
              element={<EditCourse />}
            />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
