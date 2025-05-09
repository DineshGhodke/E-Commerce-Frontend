import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './AdminDashboard.css'; // ✅ Make sure this CSS has styles for .dashboard-content

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/order/view")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  const handleStatusUpdate = (orderId) => {
    alert(`Update status for Order ID: ${orderId}`);
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Manage Orders</h3>
        </div>

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
              <tr>
                <td colSpan="6" className="text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
