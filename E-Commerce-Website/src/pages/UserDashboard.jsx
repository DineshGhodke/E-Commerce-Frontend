import React from 'react';

function UserDashboard() {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-success">User Dashboard</h2>
      <div className="card mt-4 p-4 shadow">
        <p>Welcome, User! 🙋‍♂️</p>
        <ul>
          <li>Browse Products</li>
          <li>My Orders</li>
          <li>My Profile</li>
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
