import React, { useState } from 'react';

function Payment() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert('Payment successful (UI only)');
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4">Payment</h3>
      <form onSubmit={handlePayment}>
        <div className="mb-3">
          <label>Card Holder Name</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Card Number</label>
          <input type="text" className="form-control" name="cardNumber" maxLength="16" onChange={handleChange} required />
        </div>
        <div className="mb-3 row">
          <div className="col-md-6">
            <label>Expiry Date</label>
            <input type="text" className="form-control" name="expiry" placeholder="MM/YY" onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>CVV</label>
            <input type="password" className="form-control" name="cvv" maxLength="3" onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-success w-100">Pay ₹85000</button>
      </form>
    </div>
  );
}

export default Payment;
