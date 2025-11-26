import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const backendURL = 'http://localhost:3002';

const FeaturedSection = ({ courses = [] }) =>{
  const featured = courses || [];

  const [course , setCourse] = useState([]);
  const [isLoading , setisLoading] = useState(true);

  //calling the get course api
  useEffect(()=>{
        // fetch the data using axios
        const fetchCourses = async ()=>{
            try{
                const response = await axios.get(backendURL+'/api/course');
                console.log("response",response.data);
                // save into state
                setCourse(response.data);
                
            }catch(error){
                console.log(error);
            }finally{
                setisLoading(false);
            }
        }

        fetchCourses();

  }, [])
//   console.log("courses",course);
  if(isLoading) return <p>Loading courses....</p>
  return (
        <>
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
          {/* 🔥 Use dynamic data from API */}
          {/*mapping over course array and adding data dynamically*/}
          {course.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <Link to={`/course/${item._id}`} className="text-decoration-none text-dark">
                <div className="card h-100 rounded overflow-hidden shadow-lg border-0">
                  
                  <span className="badge bg-primary position-absolute"
                    style={{
                      top: "10px",
                      right: "10px",
                      padding: "8px 12px",
                      fontSize: "0.75rem",
                      zIndex: 2
                    }}
                  >
                    Course Category: {item.category.name}
                  </span>

                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">{item.title}</h5>

                    <p className="card-text flex-grow-1 text-muted">
                      {item.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-warning fw-bold">⭐ {item.rating}</span>
                      <small className="text-muted">{item.instructor.name}</small>
                    </div>

                    <div className="mt-2">
                      <span className="fw-bold text-success fs-5">
                        {item.price}
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
        </>
    )
}

export default FeaturedSection;