import React from 'react';

function AdminOrders() {
  const orders = [
    { id: 101, user: 'Dinesh', items: ['Laptop'], status: 'Shipped' },
    { id: 102, user: 'John', items: ['Phone'], status: 'Processing' }
  ];

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4">Manage Orders</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Order ID</th><th>User</th><th>Items</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>{order.items.join(', ')}</td>
              <td>{order.status}</td>
              <td><button className="btn btn-sm btn-success">Update Status</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
