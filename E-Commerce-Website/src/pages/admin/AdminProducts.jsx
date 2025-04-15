import React from 'react';
import { Link } from 'react-router-dom';

function AdminProducts() {
  const products = [
    { id: 1, name: 'Laptop', price: 60000 },
    { id: 2, name: 'Phone', price: 25000 }
  ];

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4">Manage Products</h3>
      <Link to="/admin/add-product" className="btn btn-primary mb-3">Add New Product</Link>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
