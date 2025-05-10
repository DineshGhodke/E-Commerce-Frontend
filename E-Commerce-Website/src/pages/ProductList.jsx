import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";
  const categoryParam = queryParams.get("category") || "";

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/product/view");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        localStorage.setItem("allProducts", JSON.stringify(data));
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/categories/view");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? String(p.categoryId) === selectedCategory || String(p.category_id) === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ marginTop: "80px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>All Products</h3>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="form-select w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div className="col-md-3 mb-3" key={p.id || p.pid}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  cursor: "pointer",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
                onClick={() =>
                  navigate("/productInfo", {
                    state: {
                      productId: p.id || p.pid,
                      image: `http://localhost:8081/imgs/${p.imageUrl}`,
                      title: p.name,
                      desc: p.description,
                      price: p.price,
                      categoryName: getCategoryName(p.categoryId),
                      discount: p.discount,
                    },
                  })
                }
              >
                <div
                  style={{
                    height: "160px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`http://localhost:8081/imgs/${p.imageUrl}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">₹{p.price}</p>
                  <p className="card-text small">{p.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
