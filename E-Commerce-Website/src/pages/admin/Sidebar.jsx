import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaBoxOpen, FaUsers, FaShoppingCart, FaListAlt, FaCogs, FaUserCircle } from 'react-icons/fa';
import './AdminDashboard.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="profile-icon text-center my-3">
        <FaUserCircle size={60} color="#fff" />
        
      </div>

      <h4 className="text-white text-center">Admin Panel</h4>
      <Nav className="flex-column text-center">
        <Nav.Link as={Link} to="/admin/AdminDashboard" className="nav-link">
          <FaTachometerAlt /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/add-product/" className="nav-link">
          <FaPlus /> Add Product
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/products" className="nav-link">
          <FaBoxOpen /> View Products
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/users" className="nav-link">
          <FaUsers /> View Users
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/ViewOrders" className="nav-link">
          <FaShoppingCart /> View Orders
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/add-category" className="nav-link">
          <FaPlus /> Add Category
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/ViewCategories" className="nav-link">
          <FaListAlt /> View Categories
        </Nav.Link>
        {/* <Nav.Link as={Link} to="/admin/settings" className="nav-link">
          <FaCogs /> Settings
        </Nav.Link> */}
        <Nav.Link as={Link} to="/admin/profile" className="nav-link">
          <FaUserCircle /> Profile
        </Nav.Link>
        <Nav.Link onClick={handleLogout} className="nav-link text-danger">
          <FaUserCircle /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
