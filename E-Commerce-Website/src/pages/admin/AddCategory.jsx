import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // ✅ Make sure to import Sidebar
import Swal from "sweetalert2";  // ✅ Import SweetAlert2
import "./AdminDashboard.css";  // ✅ Ensure you have dashboard-content styles

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8081/categories/addCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const message = await response.text();

      // ✅ Use Swal.fire here
      Swal.fire({
        title: "Success!",
        text: `Category "${category.name}" added successfully!`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setCategory({ name: "", description: "" });
        navigate("/admin/ViewCategories");
      });

    } catch (error) {
      console.error("Error adding category:", error);
      setError("Failed to add category. Please try again later.");
    }
  };

  return (
    <div className="d-flex mt-4">
      <Sidebar />

      <div className="dashboard-content">
        <h2>Add Category</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/admin/AdminDashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={category.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Description:</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={category.description}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
