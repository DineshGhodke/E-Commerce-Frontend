import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const updateQuantity = (index, quantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = quantity;
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const removeFromCart = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const getTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  };

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <Container className="mt-5 pt-4">
      <h2><i className="bi bi-cart3"></i> Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item, index) => (
              <Col md={3} key={index} className="mb-3">
                <Card className="h-100 shadow-sm border-0">
                  <div style={{ height: "160px", width: "100%", overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>₹{item.price}</Card.Text>

                    <Form.Group className="mb-2">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                      />
                    </Form.Group>

                    <Button variant="danger" size="sm" onClick={() => removeFromCart(index)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h4 className="mt-3">Total: ₹{getTotal()}</h4>
          <Button variant="success" onClick={handleCheckout}>Proceed to Checkout</Button>
        </>
      )}
    </Container>
  );
}

export default CartPage;
