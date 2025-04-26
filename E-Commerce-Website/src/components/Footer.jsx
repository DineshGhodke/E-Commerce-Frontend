import React from 'react';
import './Footer.css'; // Optional: for custom styles
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-white ">
      <div className="container text-md-left">
        <div className="row text-md-left">

          {/* Column 1 */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">E-Shop</h5>
            <p>Your one-stop online shop for all your needs. Amazing deals, fast delivery, and quality you can trust.</p>
          </div>

          {/* Column 2 */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Shop</h5>
            <p><a href="#" className="text-white text-decoration-none">Electronics</a></p>
            <p><a href="#" className="text-white text-decoration-none">Fashion</a></p>
            <p><a href="#" className="text-white text-decoration-none">Home & Kitchen</a></p>
            <p><a href="#" className="text-white text-decoration-none">Books</a></p>
          </div>

          {/* Column 3 */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Help</h5>
            <p><a href="#" className="text-white text-decoration-none">Contact Us</a></p>
            <p><a href="#" className="text-white text-decoration-none">Returns</a></p>
            <p><a href="#" className="text-white text-decoration-none">FAQ</a></p>
            <p><a href="#" className="text-white text-decoration-none">Shipping</a></p>
          </div>

          {/* Column 4 */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Follow Us</h5>
            <div className="d-flex">
              <a href="#" className="text-white me-4"><FaFacebookF /></a>
              <a href="#" className="text-white me-4"><FaTwitter /></a>
              <a href="#" className="text-white me-4"><FaInstagram /></a>
              <a href="#" className="text-white"><FaYoutube /></a>
            </div>
            <p className="mt-3">© {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;