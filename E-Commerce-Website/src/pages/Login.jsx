import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService';
import './Login.css'; // Custom CSS import

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'USER' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginService.loginUser(loginData);

      if (response.data === "Login successful!") {
        alert("Login successful!");
        if (loginData.role === 'ADMIN') {
          navigate('/admin/AdminDashboard');
        } else {
          navigate('/user/UserDashboard');
        }
      } else {
        alert(response.data); // "Invalid email or password"
      }

    } catch (error) {
      alert('Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow login-card">
        <h3 className="mb-4 text-primary text-center">Login</h3>
        <form onSubmit={handleSubmit}>
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
          <button type='submit' className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
