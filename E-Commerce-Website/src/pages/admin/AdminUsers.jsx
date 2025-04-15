import React, { useState, useEffect } from 'react';
import AdminService from './services/AdminService'; // AdminService चा इम्पोर्ट करा

function AdminUsers() {
  const [users, setUsers] = useState([]);  // युजर्स स्टेट सेट करा

  // बॅकएंडकडून युजर्स मिळवण्यासाठी useEffect वापरा
  useEffect(() => {
    AdminService.getAllUsers()
      .then(response => {
        setUsers(response.data);  // प्राप्त युजर्स डेटा स्टेटमध्ये सेट करा
      })
      .catch(error => {
        console.error('There was an error fetching users!', error);
      });
  }, []);  // रिक्वेस्ट फक्त एकदाच होईल म्हणून [] वापरले

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4">Manage Users</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
