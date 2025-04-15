import React from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const cartItems = [
    { id: 1, name: 'Laptop', price: 60000, quantity: 1 },
    { id: 2, name: 'Phone', price: 25000, quantity: 2 }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4">My Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6>{item.name}</h6>
                  <small>Quantity: {item.quantity}</small>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <h5>Total: ₹{total}</h5>
          <Link to="/order" className="btn btn-primary mt-3 w-100">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
