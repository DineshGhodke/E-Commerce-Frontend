import React from "react";
import { Table, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "./AdminDashboard.css";

const ViewUsers = () => {
  // Static user data - Later replace with API call
  const users = [
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "User" },
    { id: 2, name: "Sneha Patil", email: "sneha@example.com", role: "Admin" },
    { id: 3, name: "Ajay Kadam", email: "ajay@gmail.com", role: "User" },
  ];

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
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewUsers;
