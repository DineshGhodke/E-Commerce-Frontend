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
import Profile from './pages/Profile';
import ProductList from './pages/ProductList';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Payment from './pages/Payment';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/search" element={<ProductList />} />

          <Route path="/productInfo" element={<ProductInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<ProductList />} />  
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="user/UserDashboard" element={<UserDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />




        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
