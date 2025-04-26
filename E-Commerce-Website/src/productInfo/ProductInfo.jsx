// src/ProductInfo.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import './ProductInfo.css';

function ProductInfo() {
  const { state } = useLocation();

  if (!state) {
    return <h4 className="text-center mt-5">No product selected!</h4>;
  }

  const { image, title, desc, price, categories, discount } = state;

  const handleOrder = () => {
    alert(`Order placed for: ${title}`);
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push({ image, title, price });
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert(`${title} added to cart!`);
  };

  return (
    <Container className="product-container">
      <Row>
        <Col md={5} className="text-center">
          <Card className="product-image-card">
            <img
              src={image}
              alt={title}
              className="img-fluid product-img"
            />
          </Card>
          <div className="button-group">
            <Button variant="outline-primary" onClick={handleAddToCart}>
              🛒 Add to Cart
            </Button>
            <Button variant="primary" onClick={handleOrder}>
              » Buy Now
            </Button>
          </div>
        </Col>

        <Col md={7}>
          <h4>{title}</h4>
          <h5 className="text-success">₹ {price} &nbsp;
            {discount && (
              <>
                <span className="strike-price">₹{parseInt(price * (1 + discount / 100))}</span>
                <span className="discount"> &nbsp; {discount}% off</span>
              </>
            )}
          </h5>
          <p className="badge bg-light text-dark mt-2">Free Delivery</p>
          <p><strong>Category:</strong> {categories}</p>
          <h6 className="mt-4">Product Details</h6>
          <ul>
            <li><strong>Description:</strong> {desc}</li>
            <li><strong>Type:</strong> Mobile</li>
            <li><strong>Connectivity:</strong> 5G Supported</li>
            <li><strong>Color:</strong> Gold</li>
            <li><strong>Battery:</strong> 5000 mAh</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductInfo;
