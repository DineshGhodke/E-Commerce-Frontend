import React from 'react';
import UserSidebar from './UserSidebar';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className=" d-flex">
      <UserSidebar />
      <Container className="  mt-4">
        <h3 className="mb-4">Welcome, {user?.name || "User"} 🎉</h3>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Profile Information</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {user?.name} <br />
                  <strong>Email:</strong> {user?.email} <br />
                  <strong>Role:</strong> {user?.role}
                </Card.Text>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
