import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/layouts/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/categories/:categoryName" element={<CategoryPage />} />
    </Routes>
    <Footer/>
    </>

    
  )
}

export default App
