import React, { useState } from "react";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/categories/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const message = await response.text();
      alert(message);
      setCategory({ name: "", description: "" }); // reset form
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Category</h2>
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
