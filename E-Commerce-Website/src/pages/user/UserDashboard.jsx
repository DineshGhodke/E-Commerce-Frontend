import React, { useState } from 'react';
import UserSidebar from './UserSidebar';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("id") || "N/A";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="d-flex">
      <UserSidebar />
      
      <Container className="mt-4" style={{ marginLeft: '250px' }}>
        <h3 className="mb-4">Welcome, {user?.name || "User"} 🎉</h3>
        
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="text-primary">
                  {isEditing ? 'Edit Profile' : 'Profile Information'}
                </Card.Title>
                
                {isEditing ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={user?.name || ""}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={user?.email || ""}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        as="select"
                        name="role"
                        value={user?.role || "USER"}
                        onChange={handleChange}
                        disabled // Typically role shouldn't be editable by user
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </Form.Control>
                    </Form.Group>

                    <div className="d-flex gap-3 mt-4">
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                      <Button variant="secondary" onClick={handleEditToggle}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <>
                    <Card.Text as="div">
                      <div className="mb-3">
                        <strong>User ID:</strong> {userId}
                      </div>
                      <div className="mb-3">
                        <strong>Name:</strong> {user?.name || "Not available"}
                      </div>
                      <div className="mb-3">
                        <strong>Email:</strong> {user?.email || "Not available"}
                      </div>
                      <div className="mb-3">
                        <strong>Role:</strong> {user?.role || "USER"}
                      </div>
                    </Card.Text>

                    <div className="d-flex gap-3">
                      <Button
                        variant="primary"
                        onClick={handleEditToggle}
                        className="mt-3"
                      >
                        Edit Profile
                      </Button>
                      <Button
                        variant="danger"
                        onClick={handleLogout}
                        className="mt-3"
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;