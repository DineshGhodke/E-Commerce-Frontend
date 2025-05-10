import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';  // ✅ added SweetAlert2
import "./PaymentPage.css"; // Import your CSS file for styling

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  if (!state) {
    return <p>No payment information found.</p>;
  }

  const { userId, cartItems, totalAmount } = state;

  const validateForm = () => {
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill in all payment details.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      Swal.fire({
        title: 'Invalid Card Number!',
        text: 'Card number must be 16 digits.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      Swal.fire({
        title: 'Invalid CVV!',
        text: 'CVV must be 3 digits.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }

    return true;
  };

  const handlePaymentSuccess = async () => {
    if (!validateForm()) {
      return;
    }

    const orderData = {
      userId: userId,
      totalAmount: totalAmount,
      status: "Pending",
      items: cartItems.map((item) => ({
        productId: item.productId || item.id,
        quantity: item.quantity || 1,
        price: item.price,
      })),
    };

    try {
      const response = await fetch("http://localhost:8081/order/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.text();
      console.log("Order placed:", result);

      if (response.ok) {
        Swal.fire({
          title: 'Payment Successful!',
          text: result,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          localStorage.removeItem("cartItems");
          localStorage.removeItem("productIds");
          navigate("/user/userDashboard");
        });
      } else {
        Swal.fire({
          title: 'Order Failed!',
          text: result,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while placing the order.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="payment-container">
      <h3>Payment Page</h3>
      <p>Total Amount: ₹ {totalAmount}/-</p>

      <form className="mt-3">
        <div className="form-group">
          <label>Card Name</label>
          <input
            type="text"
            className="form-control"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Name on Card"
          />
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            className="form-control"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="16-digit Card Number"
            maxLength="16"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="month"
              className="form-control"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              className="form-control"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="3-digit CVV"
              maxLength="3"
            />
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handlePaymentSuccess}
        >
          Place Order
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/cart")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
