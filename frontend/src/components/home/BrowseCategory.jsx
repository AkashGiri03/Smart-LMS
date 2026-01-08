import { Link } from "react-router-dom";

const BrowseCategory = () => {

    const categories = [
    {
      name: "Web Development",
      link: "/categories/web",
      startColor: "#6a11cb",
      endColor: "#2575fc",
      image:
        "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/code-slash.svg",
      courseCount: 24,
    },
    {
      name: "Data Analytics",
      link: "/categories/data",
      startColor: "#ff512f",
      endColor: "#dd2476",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/bar-chart.svg",
      courseCount: 18,
    },
    {
      name: "UX/UI",
      link: "/categories/design",
      startColor: "#f7971e",
      endColor: "#ffd200",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/brush.svg",
      courseCount: 12,
    },
    {
      name: "DB",
      link: "/categories/marketing",
      startColor: "#56ab2f",
      endColor: "#a8e063",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/megaphone.svg",
      courseCount: 8,
    },
    {
      name: "DSA",
      link: "/categories/business",
      startColor: "#ff4b1f",
      endColor: "#ff9068",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/briefcase.svg",
      courseCount: 15,
    },
    {
      name: "AI",
      link: "/categories/personal",
      startColor: "#00c6ff",
      endColor: "#0072ff",
      image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/person.svg",
      courseCount: 10,
    },
  ];

  return (
    <section className="container my-5">
        <h2 className="mb-4 text-center">Browse Categories</h2>
        <div className="row g-4">
          {categories.map((cat, index) => (
            <div className="col-6 col-md-4 col-lg-2 text-center" key={index}>
              <Link
                to={"/courses"}
                className="category-card-gradient d-flex flex-column align-items-center justify-content-center p-4 rounded text-decoration-none text-white h-100"
                style={{
                  background: `linear-gradient(135deg, ${cat.startColor}, ${cat.endColor})`,
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="mb-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                  }}
                />
                <span className="fw-semibold mb-1">{cat.name}</span>
                <small>{cat.courseCount} Courses</small>
              </Link>
            </div>
          ))}
        </div>
      </section>
  )
}

export default BrowseCategory;
