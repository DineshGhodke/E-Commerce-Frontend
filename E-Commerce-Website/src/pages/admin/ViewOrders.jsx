import React, { useEffect, useState } from 'react';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/order/view") // backend API
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  const handleStatusUpdate = (orderId) => {
    // Status update logic placeholder
    alert(`Update status for Order ID: ${orderId}`);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3 className="mb-4">Manage Orders</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>₹{order.total_amount}</td>
                <td>
                  <span className={`badge ${
                    order.status === 'PENDING' ? 'bg-warning' :
                    order.status === 'CONFIRMED' ? 'bg-info' :
                    order.status === 'SHIPPED' ? 'bg-primary' :
                    order.status === 'DELIVERED' ? 'bg-success' :
                    'bg-danger'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-success" onClick={() => handleStatusUpdate(order.id)}>
                    Update Status
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="text-center">No orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
