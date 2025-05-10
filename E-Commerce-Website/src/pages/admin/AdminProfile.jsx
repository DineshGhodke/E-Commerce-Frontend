import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import "./AdminProfile.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const storedAdmin = JSON.parse(localStorage.getItem("admin"));
  const [admin, setAdmin] = useState(storedAdmin || {});
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(admin.name);
  const [editedEmail, setEditedEmail] = useState(admin.email);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(admin.name);
    setEditedEmail(admin.email);
  };

  const handleSaveProfile = () => {
    const updatedAdmin = {
      ...admin,
      name: editedName,
      email: editedEmail,
    };
    setAdmin(updatedAdmin);
    localStorage.setItem("admin", JSON.stringify(updatedAdmin));
    setIsEditing(false);
  };

  if (!storedAdmin) {
    return (
      <div className="p-4">
        <h5>No admin data found. Please login again.</h5>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="dashboard-content">
        <h3>Admin Profile</h3>
        <Card className="admin-profile-card">
          <Card.Body>
            {isEditing ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label><strong>Name:</strong></Form.Label>
                  <Form.Control
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><strong>Email:</strong></Form.Label>
                  <Form.Control
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" onClick={handleSaveProfile} className="me-2">
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <Card.Title><strong>Admin Name:</strong> {admin.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><strong>Role:</strong> {admin.role}</Card.Subtitle>
                <Card.Text>
                  <strong>Email:</strong> {admin.email} <br />
                </Card.Text>
                <Button variant="primary" onClick={handleEditProfile} className="edit-profile-button me-2" >
                  <i className="bi bi-pencil-square"></i>
                  Edit Profile
                </Button>
                <Button variant="danger" onClick={handleLogout} className="Admin-logout-button">
                  Logout
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
