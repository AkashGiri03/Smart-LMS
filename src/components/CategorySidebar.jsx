import { useState } from "react";

export default function CategorySidebar({
  categories = [],
  selected,
  onSelect = () => {},
  courseCounts = {},        // { categoryId: count }
}) {
  const [search, setSearch] = useState("");

  // Filter categories based on search bar input
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-3 bg-light rounded shadow-sm">

      {/* SEARCH BAR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CATEGORY LIST */}
      <div className="list-group">

        {/* ALL CATEGORIES BUTTON */}
        <button
          type="button"
          className={`list-group-item list-group-item-action d-flex justify-content-between 
            ${selected === null ? "active" : ""}`}
          onClick={() => onSelect(null)}
        >
          <span>All Categories</span>
          <span className="badge bg-primary">{courseCounts.all || 0}</span>
        </button>

        {/* EACH CATEGORY */}
        {filteredCategories.map((cat) => {
          const id = cat._id || cat.id;
          const count = courseCounts[id] || 0;

          return (
            <button
              key={id}
              type="button"
              className={`list-group-item list-group-item-action d-flex justify-content-between 
                ${selected === id ? "active" : ""}`}
              onClick={() => onSelect(id)}
            >
              <span>{cat.name}</span>
              <span className="badge bg-secondary">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
