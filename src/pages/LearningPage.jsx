import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const BACKENDURL = import.meta.env.VITE_API_BASE;

const LearningPage = () => {
  const { user } = useAuth;
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch courses from get courses endpoint
    try {
      const getMyCourses = async () => {
        setIsLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        };
        const myCourses = await axios.get(
          BACKENDURL + "/api/courses/my-courses"
        );
        setCourses(myCourses);
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Error fetching my courses!", error);
    }

    if (user) {
      getMyCourses();
    }
  }, [user]);

  if (isLoading) return <p>Loading your courses!</p>;

  return (
    <>
      <h1>My learning center</h1>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">
                  {course.description || "No description available"}
                </p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <Link
                  to={`/learn/courses/${course._id}`}
                  className="btn btn-primary w-100"
                >
                  Go to Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LearningPage;
