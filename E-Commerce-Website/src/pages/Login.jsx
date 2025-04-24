import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService';
import './Login.css'; // Custom CSS import

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 5) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!loginData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setInvalidCredentials(false); // clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const response = await LoginService.loginUser(loginData);
  
      if (response.status === 200) {
        alert("Login successful!");
        console.log(response.data.role);
  
        // 🔥 Store login info in localStorage
        const userData = {
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          joined: response.data.joined || "April 2023"
        };
  
        localStorage.setItem("admin", JSON.stringify(userData)); // or "user" based on role
        localStorage.setItem("isLoggedIn", true);
  
        // 🔁 Navigate based on role
        if (response.data.role === 'ADMIN') {
          navigate('/admin/AdminDashboard');
        } else {
          navigate('/user/UserDashboard');
        }
      } else {
        setInvalidCredentials(true);
      }
    } catch (error) {
      setInvalidCredentials(true);
    }
  };
  

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow login-card">
        <h3 className="mb-4 text-primary text-center">Login</h3>
        
        {/* Show invalid login message */}
        {invalidCredentials && (
          <div className="alert alert-danger text-center" role="alert">
            Invalid email or password
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email || invalidCredentials ? 'is-invalid' : ''}`}
              name="email"
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${errors.password || invalidCredentials ? 'is-invalid' : ''}`}
              name="password"
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <label>Role</label>
            <select
              className={`form-control ${errors.role ? 'is-invalid' : ''}`}
              name="role"
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
