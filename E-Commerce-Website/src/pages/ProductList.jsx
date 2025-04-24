import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from "../context/CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // extract query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8081/product/view');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
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
      <h3 className="mb-3">All Products</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div className="col-md-4 mb-4" key={p.id}>
              <div
                className="card h-100 shadow"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate('/productInfo', {
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
                <img
                  src={`http://localhost:8081/imgs/${p.imageUrl}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">Price: ₹{p.price}</p>
                  <p className="card-text">Categories: {p.categories}</p>
                  <p className="card-text">Description: {p.description}</p>
                 
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
