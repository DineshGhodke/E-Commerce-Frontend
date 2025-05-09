import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";  // ✅ Import Sidebar
import "./AdminDashboard.css";   // ✅ Make sure dashboard-content styles are present

function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
          fetchCategories(); // Refresh list
        } else {
          throw new Error("Failed to delete category");
        }
      })
      .catch((err) => console.error("Error deleting category: ", err));
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content">
        <h3>Categories List</h3>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/admin/AdminDashboard")}
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCategory;
