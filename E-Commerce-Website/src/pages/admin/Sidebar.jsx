import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login tokens if any (optional)
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h4>Admin Panel</h4>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/admin/dashboard" className="nav-link">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/admin/add-product" className="nav-link">Add Product</Nav.Link>
        <Nav.Link as={Link} to="/admin/products" className="nav-link">View Products</Nav.Link>
        <Nav.Link as={Link} to="/admin/users" className="nav-link">View Users</Nav.Link>
        {/* <Nav.Link as={Link} to="/admin/orders" className="nav-link">Orders</Nav.Link> */}
        <Nav.Link as={Link} to="/admin/ViewOrders" className="nav-link">ViewOrders</Nav.Link>
        <Nav.Link as={Link} to="/admin/ViewCategories" className="nav-link">View Categories</Nav.Link>
        <Nav.Link as={Link} to="/admin/settings" className="nav-link">Settings</Nav.Link>
        <Nav.Link as={Link} to="/admin/profile" className="nav-link">Profile</Nav.Link>
       
       
       
      </Nav>
    </div>
  );
};

export default Sidebar;
