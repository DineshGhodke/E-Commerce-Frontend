import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const userId = localStorage.getItem('userId');

  // 👉 totalAmount calculate करण्यासाठी state
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    // 👉 totalAmount काढणे
    const total = storedCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalAmount(total);
  }, []);

  const handlePlaceOrder = async () => {
    if (!userId) {
      alert('Please login first!');
      return;
    }

    const order = {
      userId: parseInt(userId),
      cartItems: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: totalAmount, // 👉 totalAmount frontend मधून पाठवला!
      shippingAddress: shippingAddress,
      paymentMethod: 'Credit Card',
    };

    try {
      const response = await axios.post('http://localhost:8081/order/placeOrder', order);
      setOrderStatus(response.data);
      localStorage.removeItem('cartItems');
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus('Order Placement Failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout Page</h2>
      <div className="mb-3">
        <label htmlFor="shippingAddress" className="form-label">Shipping Address:</label>
        <input
          type="text"
          id="shippingAddress"
          className="form-control"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>

      <h4>Cart Items</h4>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="list-group mb-3">
          {cartItems.map(item => (
            <li key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} - ₹{item.price} x {item.quantity}
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}

      <h5>Total Amount: ₹{totalAmount}</h5>

      <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>

      {orderStatus && <p className="mt-3">{orderStatus}</p>}
    </div>
  );
};

export default CheckoutPage;
