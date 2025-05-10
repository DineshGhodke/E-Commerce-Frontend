import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './AdminDashboard.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch("http://localhost:8081/order/view")
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then(data => {
        setOrders(data);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setError("Could not load orders. Please try again later.");
      });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8081/order/update/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status. Please try again.');
    }
  };

  const statusOptions = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Manage Orders</h3>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

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
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId || order.user_id || 'N/A'}</td>
                  <td>₹{order.totalAmount || order.total_amount || 0}</td>
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
                  <td>
                    {order.createdAt || order.created_at
                      ? new Date(order.createdAt || order.created_at).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <nav aria-label="Order pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={prevPage}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(number => (
              <li
                key={number}
                className={`page-item ${currentPage === number ? 'active' : ''}`}
              >
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={nextPage}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminOrders;
