import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaBoxOpen, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import './UserSidebar.css';

const UserSidebar = () => {
  return (
    <div className="user-sidebar  ">
      <div className='iconname'>
      <div className="profile-icon text-center ">
        <FaUserCircle size={60} color="#fff" />
      </div>

      <h4 className="username text-white text-center">User Panel</h4>
      </div>
      <Nav defaultActiveKey="/user/dashboard" className="flex-column  text-center ">
        <Nav.Link as={Link} to="/user/UserDashboard" className="nav-link">
          <FaTachometerAlt /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/user/MyCart" className="nav-link">
          <FaShoppingCart /> My Cart
        </Nav.Link>
        <Nav.Link as={Link} to="/user/MyOrders" className="nav-link">
          <FaBoxOpen /> My Orders
        </Nav.Link>
        <Nav.Link as={Link} to="/user/PlaceOrder" className="nav-link">
          <FaBoxOpen /> Place Orders
        </Nav.Link>
        <Nav.Link as={Link} to="/user/AddAddressForm" className="nav-link">
          <FaUser /> Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/login" className="nav-link text-danger">
          <FaSignOutAlt /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default UserSidebar;
