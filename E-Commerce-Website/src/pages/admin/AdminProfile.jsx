import React from "react";
import Sidebar from "./Sidebar";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import "./AdminProfile.css"; // Add this new CSS

const AdminProfile = () => {
  const admin = {
    name: "Dinesh Ghodke",
    email: "admin@example.com",
    role: "Administrator",
    joined: "April 2023",
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
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

        <Card className="shadow-sm profile-card">
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-person-circle profile-icon me-3"></i>
              <div>
                <Card.Title className="mb-0">{admin.name}</Card.Title>
                <Card.Subtitle className="text-muted">{admin.role}</Card.Subtitle>
              </div>
            </div>
            <Card.Text>
              <strong>Email:</strong> {admin.email} <br />
              <strong>Joined:</strong> {admin.joined}
            </Card.Text>
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
