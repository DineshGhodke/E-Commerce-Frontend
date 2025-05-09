import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar like in ViewUsers
import "./ViewProducts.css"; // Keep your existing styles
import { Button, Table, Form, InputGroup } from "react-bootstrap";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/product/view");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/categories/view");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategories();
  }, []);

  // Delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:8081/product/delete/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete product");
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Search products by name
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8081/product/search/${searchName}`);
      if (!response.ok) throw new Error("Failed to search products");
      const data = await response.json();
      if (data.length === 0) {
        setError("No product found with the given name");
        setProducts([]);
      } else {
        setError(null);
        setProducts(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>All Products</h3>
          <Button variant="secondary" onClick={() => window.history.back()}>
            ← Back
          </Button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by product name"
          />
          <Button variant="info" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{categories.find((c) => c.id === product.categoryId)?.name || "Unknown"}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <img
                      src={
                        product.imageUrl
                          ? `http://localhost:8081/imgs/${product.imageUrl}`
                          : "https://via.placeholder.com/300"
                      }
                      alt={product.name}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    <Link to={`/update-product/${product.id}`} className="btn btn-primary btn-sm me-2">
                      Edit
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewProducts;
