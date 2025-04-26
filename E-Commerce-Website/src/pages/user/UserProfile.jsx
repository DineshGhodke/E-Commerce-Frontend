import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(data => alert('Profile updated successfully!'))
      .catch(err => console.error('Error updating profile:', err));
  };

  const handleBlock = () => {
    alert('User has been blocked. (Demo action)');
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-info mb-4">My Profile</h2>

      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={profile.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={profile.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phone" value={profile.phone} onChange={handleChange} />
          </Form.Group>

          <Row>
            <Col xs={12} md={6} className="mb-2">
              <Button type="submit" variant="primary" className="w-100">Update Profile</Button>
            </Col>
            <Col xs={12} md={6}>
              <Button variant="danger" className="w-100" onClick={handleBlock}>Block User</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default Profile;
