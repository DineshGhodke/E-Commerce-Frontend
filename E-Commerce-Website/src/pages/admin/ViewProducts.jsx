import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import './AdminDashboard.css';

const ViewProducts = () => {
  // Later: fetch from backend
  const products = [
    { id: 1, name: 'Mobile', price: 9999, category: 'Electronics' },
    { id: 2, name: 'Shoes', price: 1999, category: 'Fashion' },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      
      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>All Products</h3>
          <Button variant="secondary" href="/admin/AdminDashboard">
            ← Back to Dashboard
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.category}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewProducts;
