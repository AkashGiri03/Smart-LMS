import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/layouts/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LessonPlayerPage from "./pages/LessonPlayerPage.jsx";
import LearningPage from "./pages/LearningPage.jsx";


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
          <Route element={<PrivateRoute />}>
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/learn/courses/:id" element={<LessonPlayerPage />} />            
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;



