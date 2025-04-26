import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedItems);
  }, []);

  const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <Container className="cart-container mt-4">
      <Row className="justify-content-center">
        <Col md={5} lg={6}> {/* 👈 Reduced overall cart width here */}
          <h3 className="mb-4">🛒 Shopping Cart</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <Row>
              {cartItems.map((item, index) => (
                <Col key={index} md={6} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>₹ {item.price}</Card.Text>
                      <Button variant="danger" onClick={() => handleRemove(index)}>Remove</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          {cartItems.length > 0 && (
            <div className="text-center mt-4">
              <Button variant="success" onClick={handleCheckout}>Proceed to Checkout</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
