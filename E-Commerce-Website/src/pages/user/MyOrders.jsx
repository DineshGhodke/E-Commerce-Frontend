import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Replace with real API call
    fetch('/api/orders') // Update with actual backend endpoint
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center text-info mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <Card key={index} className="mb-3 shadow-sm p-3">
            <h5>Order ID: {order.id}</h5>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Total Amount: ₹{order.total}</p>
            <p>Ordered On: {new Date(order.date).toLocaleDateString()}</p>
          </Card>
        ))
      )}
    </Container>
  );
}

export default MyOrders;
