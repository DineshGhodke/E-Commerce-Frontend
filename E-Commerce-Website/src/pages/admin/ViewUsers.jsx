import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import UserService from "../../services/UserService"; // ✅ Adjust the path as needed
import "./AdminDashboard.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  // Load users from API
  const loadUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response.data); // assuming response.data is an array of users
    } catch (error) {
      console.error("Failed to fetch users:", error);
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
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewUsers;
