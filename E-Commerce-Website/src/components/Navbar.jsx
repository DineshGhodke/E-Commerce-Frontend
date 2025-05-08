// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';

// function Navbar() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     navigate("/login");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/search?query=${search}`);
//     setSearch('');
//   };

//   const handleCartClick = () => {
//     if (isLoggedIn) {
//       navigate("/cart");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light shadow rounded fixed-top">
//       <div className="container-fluid">
//         <Link className="navbar-brand text-light" to="/">
//           <i className="bi bi-shop"></i> E-Shop
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="mainNavbar">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link text-light" to="/">
//                 <i className="bi bi-house-door"></i> Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-light" to="/products">
//                 <i className="bi bi-bag"></i> Products
//               </Link>
//             </li>
//           </ul>

//           <form className="d-flex me-3" onSubmit={handleSearch}>
//             <input className="form-control me-2" type="search" placeholder="Search"
//               value={search} onChange={(e) => setSearch(e.target.value)} />
//             <button className="btn btn-outline-light" type="submit">
//               <i className="bi bi-search"></i>
//             </button>
//           </form>

//           <ul className="navbar-nav mb-2 mb-lg-0">
//           <li className="nav-item">
//   <Link className="nav-link text-light" to="/cart">
//     <i className="bi bi-cart3"></i> Cart
//   </Link>
// </li>


//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link text-light" to="/user/UserDashboard">
//                     <i className="bi bi-person-circle"></i> Profile
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-link nav-link text-light" onClick={handleLogout}>
//                     <i className="bi bi-box-arrow-right"></i> Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link text-light" to="/login">
//                     <i className="bi bi-box-arrow-in-right"></i> Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link text-light" to="/register">
//                     <i className="bi bi-person-plus"></i> Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role"); // "ADMIN" ya "USER"

  const handleLogout = () => {
    localStorage.clear(); // 🔥 clear all keys
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
    setSearch('');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow rounded fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          <i className="bi bi-shop"></i> E-Shop
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                <i className="bi bi-house-door"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/products">
                <i className="bi bi-bag"></i> Products
              </Link>
            </li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search"
              value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/cart">
                <i className="bi bi-cart3"></i> Cart
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  {role === "ADMIN" ? (
                    <Link className="nav-link text-light" to="/admin/AdminDashboard">
                      <i className="bi bi-person-circle"></i> Admin Dashboard
                    </Link>
                  ) : (
                    <Link className="nav-link text-light" to="/user/UserDashboard">
                      <i className="bi bi-person-circle"></i> User Dashboard
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-light" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/login">
                    <i className="bi bi-box-arrow-in-right"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/register">
                    <i className="bi bi-person-plus"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
