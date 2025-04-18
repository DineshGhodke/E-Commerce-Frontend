import React from 'react';// Import Bootstrap CSS
import './Footer.css';  // Import custom CSS for Footer

function Footer() {
  return (
    <footer className="bg-primary text-light text-center py-3 mt-4">
      <div className="container">
        &copy; {new Date().getFullYear()} www.E-Shop.com . All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
