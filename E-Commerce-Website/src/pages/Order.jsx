import React from 'react';
import { Link } from 'react-router-dom';

function Order() {
  const orders = [
    { id: 101, items: ['Laptop'], status: 'Processing' },
    { id: 102, items: ['Phone'], status: 'Shipped' }
  ];

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4">My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.id} className="list-group-item">
              <strong>Order #{order.id}</strong><br />
              Items: {order.items.join(', ')}<br />
              Status: <span className="badge bg-info">{order.status}</span>
            </li>
          ))}
        </ul>
      )}
      <Link to="/products" className="btn btn-outline-primary mt-3">Continue Shopping</Link>
    </div>
  );
}

export default Order;
