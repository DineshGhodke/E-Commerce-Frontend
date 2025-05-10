import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'USER'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update these URLs to match your actual backend endpoints
  const API_BASE_URL = 'http://localhost:8081';
  const PROFILE_URL = `${API_BASE_URL}/user/profile`; // Adjust if your endpoint is different

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(PROFILE_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }
        
        const data = await response.json();
        setProfile({
          name: data.name || 'Not available',
          email: data.email || 'Not available',
          phone: data.phone || 'Not available',
          role: data.role || 'USER'
        });
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(PROFILE_URL, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      const updatedData = await response.json();
      setProfile(updatedData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading profile data...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Profile</Alert.Heading>
          <p>{error}</p>
          <p>Please check:</p>
          <ul>
            <li>Is the backend server running?</li>
            <li>Is the endpoint correct? (Trying accessing: {PROFILE_URL})</li>
            <li>Are you properly authenticated?</li>
          </ul>
          <Button onClick={() => window.location.reload()} variant="outline-danger">
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">My Profile</h2>
      
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>Name:</strong> {profile.name}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {profile.email}
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong>Phone:</strong> {profile.phone}
              </div>
              <div className="mb-3">
                <strong>Role:</strong> {profile.role}
              </div>
            </Col>
          </Row>
          
          <div className="text-center mt-4">
            <Button  
              variant={isEditing ? "outline-secondary" : "primary"} 
              onClick={() => setIsEditing(!isEditing)}
              className="me-2"
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {isEditing && (
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <h4 className="text-center mb-4">Edit Profile</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="123-456-7890"
                />
              </Form.Group>

              <div className="text-center mt-4">
                <Button type="submit" variant="primary" className="me-2">
                  Save Changes
                </Button>
                <Button variant="outline-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Profile;