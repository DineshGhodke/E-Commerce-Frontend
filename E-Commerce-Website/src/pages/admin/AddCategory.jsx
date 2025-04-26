import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // For navigation

  // Handle input changes
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  // Handle form submission
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
      alert(message);
      setCategory({ name: "", description: "" }); // Reset form
      navigate("/admin/ViewCategories"); // Redirect to categories list
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Failed to add category. Please try again later.");
    }
  };

  return (
    <div className="container mt-4">
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
  );
};

export default AddCategory;