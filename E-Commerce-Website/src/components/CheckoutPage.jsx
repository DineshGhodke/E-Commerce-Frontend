import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, totalAmount, userId } = location.state || {};

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8081/useraddress/view`)
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(addr => addr.userid === userId);
          setSavedAddresses(filtered);
        })
        .catch(err => console.error("Error fetching addresses:", err));
    }
  }, [userId]);

  if (!cartItems || cartItems.length === 0) {
    return <p>Your cart is empty. Please add products before checkout.</p>;
  }

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
    setSelectedAddressId(null); // clear selected address if user types manually
  };

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address.id);
    setShippingInfo({
      fullName: address.fullname,
      addressLine1: address.addressLine1,
      addressLine2: "", // optional field
      city: address.city,
      state: address.state,
      postalCode: address.pincode,
      phone: address.phoneNumber,
    });
  };

  const handleContinue = () => {
    const {
      fullName,
      addressLine1,
      city,
      state,
      postalCode,
      phone,
    } = shippingInfo;

    if (!fullName || !addressLine1 || !city || !state || !postalCode || !phone) {
      alert("Please fill in all required shipping details.");
      return;
    }

    setShowPaymentOptions(true);
  };

  const handlePayment = (method) => {
    alert(`Payment method selected: ${method}\n\nPlacing order for userId: ${userId}`);
    navigate("/user/dashboard");
  };

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>

      <h5>Products in your cart</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price (₹)</th>
            <th>Subtotal (₹)</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId || item.id}>
              <td>
                <img
                  src={item.image || "https://via.placeholder.com/60"}
                  alt={item.name || item.title}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>{item.name || item.title}</td>
              <td>{item.quantity || 1}</td>
              <td>{item.price}</td>
              <td>{item.price * (item.quantity || 1)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="text-end"><strong>Total:</strong></td>
            <td><strong>₹ {totalAmount}/-</strong></td>
          </tr>
        </tbody>
      </table>

      {!showPaymentOptions && (
        <>
          <h5 className="mt-4">Select Shipping Address</h5>
          {savedAddresses.length > 0 ? (
            <div className="mb-3">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="selectedAddress"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => handleAddressSelect(addr)}
                  />
                  <label className="form-check-label">
                    {addr.fullname}, {addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}, {addr.country}
                    <br />
                    Phone: {addr.phoneNumber}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p>No saved addresses found.</p>
          )}

          <h5>Or Enter New Shipping Address</h5>
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name *"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone *"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Line 1 *"
                  name="addressLine1"
                  value={shippingInfo.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Line 2 (optional)"
                  name="addressLine2"
                  value={shippingInfo.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City *"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State *"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postal Code *"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleContinue}
            >
              Continue to Payment
            </button>
          </form>
        </>
      )}

      {showPaymentOptions && (
        <div className="mt-4">
          <h5>Select Payment Method</h5>
          <button className="btn btn-success me-3" onClick={() => handlePayment("Cash on Delivery")}>
            Cash on Delivery
          </button>
          <button className="btn btn-outline-primary" onClick={() => handlePayment("Online Payment")}>
            Pay Online
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;


// src/pages/CheckoutPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: "",
//     expiry: "",
//     cvv: ""
//   });
//   const [upiId, setUpiId] = useState("");

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedCart);
//     const totalPrice = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotal(totalPrice);
//   }, []);

//   const storedUser = JSON.parse(localStorage.getItem("loggedUser"));

//   const handlePlaceOrder = async () => {
//     if (!storedUser) {
//       alert("Please log in to place an order.");
//       navigate("/login");
//       return;
//     }

//     if (paymentMethod === "card" && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) {
//       alert("Please enter complete card details");
//       return;
//     }

//     if (paymentMethod === "upi" && !upiId) {
//       alert("Please enter your UPI ID");
//       return;
//     }

//     const order = {
//       userId: storedUser.userId,
//       totalAmount: total,
//       status: "Pending",
//       orderItems: cartItems.map(item => ({
//         productId: item.productId,
//         quantity: item.quantity,
//         price: item.price
//       }))
//     };

//     try {
//       const response = await axios.post("http://localhost:8081/order/placeOrder", order);
//       alert(response.data);
//       localStorage.removeItem("cartItems");
//       navigate("/user-dashboard");
//     } catch (error) {
//       console.error("Order failed:", error);
//       alert("Order placement failed");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Checkout</h2>

//       <div className="mb-3">
//         <label>Select Payment Method:</label>
//         <select
//           className="form-select"
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <option value="cod">Cash on Delivery</option>
//           <option value="card">Credit/Debit Card</option>
//           <option value="upi">UPI</option>
//         </select>
//       </div>

//       {paymentMethod === "card" && (
//         <div>
//           <h5>Enter Card Details</h5>
//           <input
//             type="text"
//             placeholder="Card Number"
//             className="form-control mb-2"
//             value={cardDetails.cardNumber}
//             onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Expiry (MM/YY)"
//             className="form-control mb-2"
//             value={cardDetails.expiry}
//             onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
//           />
//           <input
//             type="password"
//             placeholder="CVV"
//             className="form-control mb-2"
//             value={cardDetails.cvv}
//             onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
//           />
//         </div>
//       )}

//       {paymentMethod === "upi" && (
//         <div>
//           <h5>Enter UPI ID</h5>
//           <input
//             type="text"
//             placeholder="example@upi"
//             className="form-control mb-2"
//             value={upiId}
//             onChange={(e) => setUpiId(e.target.value)}
//           />
//         </div>
//       )}

//       <h4>Total: ₹{total}</h4>

//       <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;
