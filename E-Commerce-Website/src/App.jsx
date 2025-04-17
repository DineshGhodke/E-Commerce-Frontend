// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Category from './pages/Category';
import SearchResults from './pages/SearchResults';

import ProductInfo from './productInfo/ProductInfo';
import ProductList from './pages/ProductList';

/* Admin Imports */
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import ViewProducts from './pages/admin/ViewProducts';
import ViewUsers from './pages/admin/ViewUsers';
import ViewOrders from './pages/admin/ViewOrders';
import ViewCategories from './pages/admin/ViewCategories';
import AdminProfile from './pages/admin/AdminProfile';

/* User Imports */
import UserDashboard from './pages/user/UserDashboard';


function App() {
  return (
    <Router>
      <Navbar />

      {/* 🟨 Add marginTop to prevent overlap with fixed navbar */}
      <div className="container" style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/search" element={<ProductList />} />
          <Route path="/productInfo" element={<ProductInfo />} />
          <Route path="/products" element={<ProductList />} />  

          {/* Admin Routes */}
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<ViewProducts />} />
          <Route path="/admin/users" element={<ViewUsers />} />
          <Route path="/admin/ViewOrders" element={<ViewOrders />} />
          <Route path="/admin/ViewCategories" element={<ViewCategories />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          
          {/* User Routes */}
          <Route path="/user/UserDashborad" element={<UserDashboard />} />
         
          
          {/* Fallback Route */}

        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
