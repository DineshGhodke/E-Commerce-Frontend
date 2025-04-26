import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:8081/categories/view")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log("Error fetching categories: ", err));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:8081/categories/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // Refresh category list after deletion
          fetchCategories();
        } else {
          throw new Error("Failed to delete category");
        }
      })
      .catch((err) => console.error("Error deleting category: ", err));
  };

  return (
    <div className="container mt-4">
      <h3>Categories List</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/AdminDashboard")} // Navigate back to Admin Dashboard
        >
          ← Back to Dashboard
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th> {/* New column for Delete button */}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCategory;