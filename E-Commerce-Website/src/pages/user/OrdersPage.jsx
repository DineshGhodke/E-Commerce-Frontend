import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Card, ListGroup, Alert } from 'react-bootstrap';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        const response = await axios.get(`http://localhost:8081/orders/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-5">
        <h4>You have no past orders</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {orders.map((order) => (
        <Card key={order.orderId} className="mb-3">
          <Card.Header>Order ID: {order.orderId} | Date: {new Date(order.orderDate).toLocaleDateString()}</Card.Header>
          <ListGroup variant="flush">
            {order.items.map((item) => (
              <ListGroup.Item key={item.productId}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>{item.productName}</h5>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div>
                    <h5>₹{(item.price * item.quantity).toFixed(2)}</h5>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Footer className="d-flex justify-content-between">
            <strong>Status: {order.status}</strong>
            <strong>Total: ₹{order.totalAmount.toFixed(2)}</strong>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default OrdersPage;
