import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import UserService from "../../services/UserService";
import "./AdminDashboard.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  // Load users from API
  const loadUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Delete user by ID
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await UserService.deleteUser(userId);
        loadUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  // Block or Unblock user by ID
  const handleBlockToggle = async (userId, isBlocked) => {
    const action = isBlocked ? "unblock" : "block";
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await UserService.updateUserStatus(userId, !isBlocked); // ✅ You need to implement this
        loadUsers();
      } catch (error) {
        console.error(`Failed to ${action} user:`, error);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>All Registered Users</h3>
          <Button variant="secondary" href="/admin/AdminDashboard">
            ← Back to Dashboard
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>MobileNo</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.role}</td>
                  <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                  <td>
                    <Button
                      variant={user.isBlocked ? "success" : "warning"}
                      size="sm"
                      onClick={() =>
                        handleBlockToggle(user.id, user.isBlocked)
                      }
                      className="me-2"
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewUsers;
