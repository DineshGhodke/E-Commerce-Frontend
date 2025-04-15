import React, { useState } from 'react';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Laptop', price: 60000 },
    { id: 2, name: 'Phone', price: 25000 },
    { id: 3, name: 'Shoes', price: 3000 }
  ];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-3">All Products</h3>
      <input
        type="text"
        placeholder="Search products..."
        className="form-control mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filtered.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">Price: ₹{p.price}</p>
                <button className="btn btn-primary w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}

export default ProductList;
