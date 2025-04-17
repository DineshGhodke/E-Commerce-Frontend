import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserDashboard() {
  return (
    <Container className="mt-5">
      <h2 className="text-center text-success">User Dashboard</h2>

      <Card className="mt-4 p-4 shadow-sm">
        <h5>Welcome, User! 🙋‍♂️</h5>
        <p>Explore your options below:</p>
        <ul>
          <li>
            <Link to="/products" className="text-decoration-none">🛍️ Browse Products</Link>
          </li>
          <li>
            <Link to="/my-orders" className="text-decoration-none">📦 My Orders</Link>
          </li>
          <li>
            <Link to="/profile" className="text-decoration-none">👤 My Profile</Link>
          </li>
        </ul>
      </Card>
    </Container>
  );
}

export default UserDashboard;
