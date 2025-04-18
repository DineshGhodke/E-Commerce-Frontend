import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserDashboard() {
  return (
    <Container className="mt-5">
      <h2 className="text-center text-success mb-4">User Dashboard</h2>

      <Row>
        <Col md={6}>
          <Card className="mb-4 p-3 shadow-sm">
            <h5>🛍️ Browse Products</h5>
            <p>Discover and explore all the available items.</p>
            <Link to="/products" className="btn btn-outline-success">Go to Products</Link>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 p-3 shadow-sm">
            <h5>📦 My Orders</h5>
            <p>Track your placed orders and view history.</p>
            <Link to="/my-orders" className="btn btn-outline-success">View Orders</Link>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 p-3 shadow-sm">
            <h5>👤 My Profile</h5>
            <p>Update your personal information and settings.</p>
            <Link to="/profile" className="btn btn-outline-success">Edit Profile</Link>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 p-3 shadow-sm">
            <h5>🧾 Wishlist</h5>
            <p>Items you've saved for later.</p>
            <Link to="/wishlist" className="btn btn-outline-success">View Wishlist</Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;
