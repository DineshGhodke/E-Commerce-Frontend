import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';

function ProductInfo() {
  const { state } = useLocation();

  if (!state) {
    return <h4 className="text-center mt-5">No product selected!</h4>;
  }

  const { image, title, desc, price, category, discount } = state;

  const handleOrder = () => {
    alert(`Order placed for: ${title}`);
  };

  const handleAddToCart = () => {
    alert(`${title} added to cart!`);
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="shadow" style={{ width: '400px' }}>
        <div
          style={{
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '10px'
          }}
        >
          <img
            src={image}
            alt={title}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{desc}</Card.Text>
          <Card.Text className="fw-bold text-success">₹ {price}</Card.Text>
          {discount && <Card.Text className="text-danger fw-bold">{discount}% OFF</Card.Text>}
          <Card.Text><strong>Category:</strong> {category}</Card.Text>
          <Button variant="primary" className="me-2" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="success" onClick={handleOrder}>
            Place Order
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductInfo;
