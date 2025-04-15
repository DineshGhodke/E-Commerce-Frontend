import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
    setSearch('');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow mb-4 rounded">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">E-Shop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link text-light" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-light" to="/products">Products</Link></li>

            {/* 🔽 Category Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-light" href="#" id="categoryDropdown" role="button" data-bs-toggle="dropdown">
                Category
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/category/electronics">Electronics</Link></li>
                <li><Link className="dropdown-item" to="/category/fashion">Fashion</Link></li>
                <li><Link className="dropdown-item" to="/category/books">Books</Link></li>
              </ul>
            </li>
          </ul>

          {/* 🔍 Search Form */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search"
              value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>

          {/* 🔑 Auth Links */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
                <li className="nav-item"><Link className="nav-link text-light" to="/profile">Profile</Link></li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-light" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link text-light" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link text-light" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
