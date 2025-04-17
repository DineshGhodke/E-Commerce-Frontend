import React from "react";
import Sidebar from "./Sidebar";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminProfile = () => {
  // Dummy profile data
  const admin = {
    name: "Dinesh Ghodke",
    email: "admin@example.com",
    role: "Administrator",
    joined: "April 2023",
  };

  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Admin Profile</h3>
          <Button variant="secondary" href="/admin/AdminDashboard">
            ← Back to Dashboard
          </Button>
        </div>

        <Card className="shadow-sm mt-3">
          <Card.Body>
            <Card.Title>{admin.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{admin.role}</Card.Subtitle>
            <Card.Text>
              <strong>Email:</strong> {admin.email} <br />
              <strong>Joined:</strong> {admin.joined}
            </Card.Text>
            {/* Logout Button */}
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
