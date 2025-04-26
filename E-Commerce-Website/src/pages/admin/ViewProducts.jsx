import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ViewProducts.css"; // Import your CSS file for styling


const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState(""); // State for search input

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/product/view");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set products to state
      } catch (error) {
        setError(error.message); // Set error if any
      }
    };

    fetchProducts(); // Call the fetch function on component mount
  }, []);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/categories/view");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data); // Set categories to state
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories(); // Call the fetch function on component mount
  }, []);

  // Handle the delete action
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/product/delete/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle the search action by product name
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8081/product/search/${searchName}`);

      
      if (!response.ok) {
        throw new Error("Failed to search products");
      }
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
    <div className="container">
      <div className="header-bar">
        <h1>Product List</h1>
        <button
          onClick={() => window.history.back()}
          className="btn btn-secondary back-button "
        >
          Back
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="search-bar">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by product name"
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-info">
          Search
        </button>
      </div>

      {products.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                {/* Show category name based on categoryId */}
                <td>
                  {categories.find((c) => c.id === product.categoryId)?.name ||
                    "Unknown"}
                </td>
                <td>₹{product.price}</td>
                <td>
                  <img
                    src={
                      product.imageUrl
                        ? `http://localhost:8081/imgs/${product.imageUrl}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={product.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/update-product/${product.id}`}
                      className="E-Button btn btn-primary "
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="D-Button btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <p>No products available</p>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;