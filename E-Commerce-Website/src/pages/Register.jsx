import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminService from '../services/UserService';
import './Register.css'; // Custom CSS import

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdminService.addAdminUser(formData);
      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow register-card">
        <h3 className="mb-4 text-primary text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" className="form-control" name="name" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Role</label>
            <select className="form-control" name="role" onChange={handleChange} required>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
