import React from 'react';

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
