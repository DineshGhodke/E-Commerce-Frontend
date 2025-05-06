import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaBoxOpen, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './UserSidebar.css'; // Assuming you have some CSS for styling

const UserSidebar = () => {
  return (
    <div 
      className="bg-light"
      style={{
        width: '220px',
        height: '100vh',
        position: 'fixed', // 👉 FIX THE SIDEBAR
        top:0,
        left: 0,
        
      }}
    >
       <div className='sidebar-content'>
      <h4 className="userpanel mb-4">User Panel</h4>
     
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
        <Nav.Link as={Link} to="/user/UserProfile">
          <FaUser className="me-2" /> Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
    </div>
  );
};


export default UserSidebar;
