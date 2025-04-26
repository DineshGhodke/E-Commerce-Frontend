import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaBoxOpen, FaUser, FaSignOutAlt } from 'react-icons/fa';

const UserSidebar = () => {
  return (
    <div className="bg-light p-3" style={{ width: '220px', height: '100vh' }}>
      <h4 className="mb-4">User Panel</h4>
      <Nav defaultActiveKey="/user/dashboard" className="flex-column">
        <Nav.Link as={Link} to="/user/dashboard">
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/user/cart">
          <FaShoppingCart className="me-2" /> My Cart
        </Nav.Link>
        <Nav.Link as={Link} to="/user/orders">
          <FaBoxOpen className="me-2" /> My Orders
        </Nav.Link>
        <Nav.Link as={Link} to="/user/profile">
          <FaUser className="me-2" /> Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default UserSidebar;
