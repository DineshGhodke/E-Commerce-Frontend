import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <div className="bg-light p-3" style={{ width: '220px', height: '100vh' }}>
      <h4 className="mb-4">User Panel</h4>
      <Nav defaultActiveKey="/user/dashboard" className="flex-column">
        <Nav.Link as={Link} to="/user/dashboard">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/user/cart">My Cart</Nav.Link>
        <Nav.Link as={Link} to="/user/orders">My Orders</Nav.Link>
        <Nav.Link as={Link} to="/user/profile">Profile</Nav.Link>
        <Nav.Link as={Link} to="/login">Logout</Nav.Link>
      </Nav>
    </div>
  );
};

export default UserSidebar;
