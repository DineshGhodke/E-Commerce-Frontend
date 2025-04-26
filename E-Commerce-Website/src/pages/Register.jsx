import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminService from '../services/UserService';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
    role: 'USER',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.mobileNo.trim()) {
      errors.mobileNo = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      errors.mobileNo = 'Mobile must be 10 digits';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 5) {
      errors.password = 'Password must be at least 5 characters';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
      <div className="card p-4 shadow register-card" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-primary text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
              <input type="text" className="form-control" name="name" onChange={handleChange} value={formData.name} />
            </div>
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label>Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope-at-fill"></i></span>
              <input type="email" className="form-control" name="email" onChange={handleChange} value={formData.email} />
            </div>
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label>Mobile Number</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-phone-fill"></i></span>
              <input type="text" className="form-control" name="mobileNo" onChange={handleChange} value={formData.mobileNo} />
            </div>
            {errors.mobileNo && <div className="text-danger">{errors.mobileNo}</div>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
              <input type="password" className="form-control" name="password" onChange={handleChange} value={formData.password} />
            </div>
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <button className="btn btn-primary w-100 mt-3">
            <i className="bi bi-box-arrow-in-right me-2"></i>Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
