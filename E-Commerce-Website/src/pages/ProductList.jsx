import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/product/view");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginTop: "80px" }}>
      <h3 className="mb-4">All Products</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div className="col-md-3 mb-3" key={p.id}>
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
                      image: `http://localhost:8081/imgs/${p.imageUrl}`,
                      title: p.name,
                      desc: p.description,
                      price: p.price,
                      category: p.categories,
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
                      objectFit: "contain", // Show the full image without cropping
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
