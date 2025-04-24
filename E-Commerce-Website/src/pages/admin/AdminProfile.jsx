import React from "react";
import Sidebar from "./Sidebar";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import "./AdminProfile.css"; // Add this new CSS

const AdminProfile = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin")); // 🔹 Step 2

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("admin"); // 🔹 Clear admin info
    navigate("/login");
  };

  // 🔹 Step 3
  if (!admin) {
    return <div className="p-4"><h5>No admin data found. Please login again.</h5></div>;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="dashboard-content">
        <h3>Admin Profile</h3>
        <Card>
          <Card.Body>
            <Card.Title>{admin.name}</Card.Title>
            <Card.Subtitle>{admin.role}</Card.Subtitle>
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
