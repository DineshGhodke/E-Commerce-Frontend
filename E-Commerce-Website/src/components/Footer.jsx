import React from 'react';// Import Bootstrap CSS
import './Footer.css';  // Import custom CSS for Footer

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-4">
      <div className="container">
        &copy; {new Date().getFullYear()} E-Commerce App. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
