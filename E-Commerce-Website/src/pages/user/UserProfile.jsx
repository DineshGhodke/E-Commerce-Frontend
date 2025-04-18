import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    // Fetch profile data (replace with your backend API)
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
    // Update profile (replace with real backend call)
    fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(data => alert('Profile updated successfully!'))
      .catch(err => console.error('Error updating profile:', err));
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
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={profile.address} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phone" value={profile.phone} onChange={handleChange} />
          </Form.Group>

          <Button type="submit" variant="primary">Update Profile</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Profile;
