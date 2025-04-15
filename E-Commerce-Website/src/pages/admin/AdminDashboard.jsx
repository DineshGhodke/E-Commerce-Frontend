import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });
  const [searchEmail, setSearchEmail] = useState('');
  const [editAdmin, setEditAdmin] = useState(null);

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/admin/viewadminusers');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  // Add a new admin
  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/admin/addadmin', newAdmin);
      setAdmins([...admins, response.data]);
      setNewAdmin({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  // Update an admin
  const handleUpdateAdmin = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/api/admin/updateadmin/${editAdmin.id}`, editAdmin);
      setAdmins(admins.map(admin => (admin.id === editAdmin.id ? response.data : admin)));
      setEditAdmin(null);
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  // Delete an admin
  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/admin/deleteadmin/${id}`);
      setAdmins(admins.filter(admin => admin.id !== id));
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  // Search admin by email
  const handleSearchByEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/admin/searchadmin?email=${searchEmail}`);
      setAdmins([response.data]);
    } catch (error) {
      console.error('Error searching admin:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Admin Dashboard</h2>

      {/* Add Admin */}
      <div className="card mt-4 p-4 shadow">
        <h4>Add Admin</h4>
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
        <button className="btn btn-success" onClick={handleAddAdmin}>
          Add Admin
        </button>
      </div>

      {/* Search Admin */}
      <div className="card mt-4 p-4 shadow">
        <h4>Search Admin by Email</h4>
        <input
          type="email"
          placeholder="Enter Email"
          className="form-control mb-2"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearchByEmail}>
          Search
        </button>
      </div>

      {/* Admin List */}
      <div className="card mt-4 p-4 shadow">
        <h4>Admin List</h4>
        <ul className="list-group">
          {admins.map((admin) => (
            <li key={admin.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{admin.name}</strong> - {admin.email}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditAdmin(admin)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteAdmin(admin.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Admin */}
      {editAdmin && (
        <div className="card mt-4 p-4 shadow">
          <h4>Edit Admin</h4>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-2"
            value={editAdmin.name}
            onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-2"
            value={editAdmin.email}
            onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
          />
          <button className="btn btn-success" onClick={handleUpdateAdmin}>
            Update Admin
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;