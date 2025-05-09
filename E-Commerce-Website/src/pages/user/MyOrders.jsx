import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import './MyOrders.css'; // Optional: For styling

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('id'); // Retrieve userId from localStorage
    // alert("User ID:"+userId); // Debug log
      if (!userId) {
        setError("User not logged in!");
        setLoading(false);
        return;
      }

      try {
        // Fetch orders from the API using the stored userId
        const response = await fetch(`http://localhost:8081/order/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // if (!response.ok) {
        //   throw new Error('Failed to fetch orders');
        // }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="my-orders-container" style={{ marginTop: '80px' }}>
      <h3 className="mb-4">My Orders</h3>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <Row>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Col md={4} key={order.id} className="mb-4">
              <Card className="order-card shadow-sm">
                <Card.Body>
                  <Card.Title>Order ID: {order.id}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}<br />
                    <strong>Status:</strong> {order.status}<br />
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </Card.Text>
                  <Button variant="outline-primary" onClick={() => alert(`Details for Order ID: ${order.id}`)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </Row>
    </Container>
  );
}

export default MyOrders;
