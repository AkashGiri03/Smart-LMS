import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const BACKENDURL = import.meta.env.VITE_API_BASE;

const LessonPlayerPage = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth;

  // fetch course details again course id
  useEffect(() => {
    try {
      const getCourseDetail = async () => {
        setIsLoading(true);
        const courseDetails = await axios.get(
          `${BACKENDURL}/api/courses/${courseId}`
        );
        setCourse(courseDetails);
      };
    } catch (error) {
      console.error("Error fetching my courses!", error);
    } finally {
      setIsLoading(false);
    }

    if (user) getCourseDetail();
  });

  return <div>LessonPlayerPage</div>;
};

export default LessonPlayerPage;
