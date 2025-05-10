import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./PaymentPage.css";

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
      Swal.fire('Warning!', 'Please fill in all payment details.', 'warning');
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      Swal.fire('Invalid Card Number!', 'Card number must be 16 digits.', 'error');
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      Swal.fire('Invalid CVV!', 'CVV must be 3 digits.', 'error');
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
      const orderResponse = await fetch("http://localhost:8081/order/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();
      console.log("Order placed:", orderResult);

      if (orderResponse.ok) {
        // ✅ Extract orderId from backend response (adjust if needed)
        const orderId = orderResult.orderId || orderResult.id || null;

        if (!orderId) {
          Swal.fire('Error!', 'Order ID missing in response!', 'error');
          return;
        }

        // ✅ Prepare payment record to store in backend
        const paymentData = {
          orderId: orderId,
          userId: userId,
          amount: totalAmount,
          paymentMethod: "CREDIT_CARD", // or detect from form
          paymentStatus: "COMPLETED",
        };

        const paymentResponse = await fetch("http://localhost:8081/payment/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        });

        const paymentResult = await paymentResponse.text();
        console.log("Payment stored:", paymentResult);

        if (paymentResponse.ok) {
          Swal.fire('Payment Successful!', 'Order and payment saved successfully!', 'success').then(() => {
            localStorage.removeItem("cartItems");
            localStorage.removeItem("productIds");
            navigate("/user/userDashboard");
          });
        } else {
          Swal.fire('Payment Failed!', paymentResult, 'error');
        }
      } else {
        Swal.fire('Order Failed!', orderResult, 'error');
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire('Error!', 'An error occurred while processing payment.', 'error');
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
