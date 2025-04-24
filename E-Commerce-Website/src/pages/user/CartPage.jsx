import React from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import UserSidebar from './UserSidebar';

const CartPage = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.location.reload(); // refresh page
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="d-flex">
      <UserSidebar />
      <Container className="mt-4">
        <h3 className="mb-4">🛒 My Cart</h3>

        {cartItems.length === 0 ? (
          <h5>Your cart is empty.</h5>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="mt-3">
              <Col md={6}>
                <h5>Total Amount: ₹{total}</h5>
              </Col>
              <Col md={6} className="text-end">
                <Button variant="success">Proceed to Checkout</Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
