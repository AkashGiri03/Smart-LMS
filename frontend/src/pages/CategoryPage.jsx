import { useParams } from "react-router-dom";

const allCourses = [
  { title: "React Basics", category: "web", students: 120 },
  { title: "Node.js Fundamentals", category: "web", students: 80 },
  { title: "Bootstrap 5", category: "design", students: 60 },
  { title: "Data Analysis with Python", category: "data", students: 40 },
  { title: "Digital Marketing", category: "marketing", students: 25 },
  { title: "Business Strategy", category: "business", students: 30 },
  { title: "Personal Growth 101", category: "personal", students: 15 },
];

export default function CategoryPage() {
  const { categoryName } = useParams();

  const filteredCourses = allCourses.filter(
    (course) => course.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-capitalize">
        {categoryName.replace("-", " ")} Courses
      </h2>

      {filteredCourses.length === 0 ? (
        <p className="text-center">No courses available in this category yet.</p>
      ) : (
        <div className="row">
          {filteredCourses.map((course, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card p-3 shadow-sm h-100">
                <h5>{course.title}</h5>
                <p>{course.students} Students enrolled</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
