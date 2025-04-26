import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext'; // ✅ Import useCart

function AllProduct() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // ✅ Use the addToCart function

  // Fetch all products on component mount
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

  // Search filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">All Products</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        type="text"
        placeholder="Search products..."
        className="form-control mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:8081/imgs/${product.imageUrl}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ₹{product.price}</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(product)} // ✅ Add to Cart handler
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default AllProduct;
