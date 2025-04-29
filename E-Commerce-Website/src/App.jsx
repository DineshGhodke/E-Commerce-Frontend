import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SearchResults from './pages/SearchResults';
import ProductInfo from './productInfo/ProductInfo';
import ProductList from './pages/ProductList';
import AddCategory from './pages/admin/AddCategory';
import Cart from './components/Cart';
import Categories from './components/Category/Categories';
import CategoryPage from './pages/category/categorypage';

/* Admin Imports */
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import ViewProducts from './pages/admin/ViewProducts';
import ViewUsers from './pages/admin/ViewUsers';
import ViewOrders from './pages/admin/ViewOrders';
import ViewCategories from './pages/admin/ViewCategory';
import AdminProfile from './pages/admin/AdminProfile';
import UpdateProduct from './pages/admin/UpdateProduct';

/* User Imports */
import UserDashboard from './pages/user/UserDashboard';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const location = useLocation();

  // ✅ Show footer only on these routes
  const showFooterPaths = ['/'];

  return (
    <>
      <Navbar />

      <div className="container" style={{ marginTop: '80px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/search" element={<ProductList />} />
          <Route path="/productInfo" element={<ProductInfo />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />


          {/* Admin Routes */}
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<ViewProducts />} />
          <Route path="/admin/users" element={<ViewUsers />} />
          <Route path="/admin/ViewOrders" element={<ViewOrders />} />
          <Route path="/admin/ViewCategories" element={<ViewCategories />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />

          {/* User Routes */}
          <Route path="/user/UserDashboard" element={<UserDashboard />} />
        </Routes>
      </div>

      {/* ✅ Show footer only on Home page */}
      {showFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;