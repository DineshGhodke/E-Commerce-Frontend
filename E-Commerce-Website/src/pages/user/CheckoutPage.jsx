import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import UserSidebar from './UserSidebar';

const CheckoutPage = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [order, setOrder] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (order.name && order.address && order.phone && cartItems.length > 0) {
      console.log("Order Placed:", { ...order, cartItems, total });

      localStorage.removeItem("cartItems"); // clear cart
      setOrderPlaced(true);
    } else {
      alert("Please fill all fields and have items in cart.");
    }
  };

  return (
    <div className="d-flex">
      <UserSidebar />
      <Container className="mt-4">
        <h3>🧾 Checkout</h3>

        {orderPlaced && (
          <Alert variant="success">Order placed successfully!</Alert>
        )}

        <Row>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={order.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={order.address} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" value={order.phone} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </Form>
          </Col>

          <Col md={6}>
            <h5>Order Summary</h5>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
            <h6>Total: ₹{total}</h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutPage;
