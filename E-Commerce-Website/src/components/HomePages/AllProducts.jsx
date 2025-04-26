import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext'; // Custom hook for cart context
import { useNavigate } from 'react-router-dom';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Add to cart hook
  const navigate = useNavigate(); // For navigating to product info

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

  return (
    <div className="container mt-4">
      <h3 className="mb-3">All Products</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div
                className="card h-100 shadow"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate('/productInfo', {
                    state: {
                      image: `http://localhost:8081/imgs/${product.imageUrl}`,
                      title: product.name,
                      desc: product.description,
                      price: product.price,
                      category: product.categories,
                      discount: product.discount,
                    },
                  })
                }
              >
                <img
                  src={`http://localhost:8081/imgs/${product.imageUrl}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ₹{product.price}</p>
                  <p className="card-text">Categories: {product.categories}</p>
                  <p className="card-text">Description: {product.description}</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
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

export default AllProducts;