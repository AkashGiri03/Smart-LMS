export default function CourseCard({ title, description, students }) {
  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">{students} students enrolled</small></p>
        <button className="btn btn-primary">View Course</button>
      </div>
    </div>
  );
}
