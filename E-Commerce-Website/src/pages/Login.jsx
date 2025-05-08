import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginService from '../services/LoginService';
import './Login.css';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailSent, setForgotEmailSent] = useState(false);
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
      newErrors.password = 'Password must be at least 5 characters';
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
    setInvalidCredentials(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const response = await LoginService.loginUser(loginData);
      console.log("Full API Response:", response);  // Debugging
  
      if (response.status === 200 && response.data) {
        alert("Login successful!");
  
        // Ensure all required fields exist with fallbacks
        const userData = {
          userId: response.data.userId || response.data.id || '', // Multiple fallbacks
          name: response.data.name || '',
          email: response.data.email || '',
          role: response.data.role || 'USER',
          joined: response.data.joined || "April 2023"
        };
  
        // Safely set localStorage
        if (userData.userId) {
          localStorage.setItem("id", userData.userId.toString());
        } else {
          console.error("No userId received from backend");
          throw new Error("User ID missing in response");
        }
  
       
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", response.data.role); // "ADMIN" ya "USER"
        
        if (response.data.role === 'ADMIN') {
          localStorage.setItem("admin", JSON.stringify(userData));
          navigate('/admin/AdminDashboard');
        } else {
          localStorage.setItem("user", JSON.stringify(userData));
          navigate('/user/UserDashboard');
        }
      } else {
        setInvalidCredentials(true);
      }
    } catch (error) {
      setInvalidCredentials(true);
      console.error("Login failed:", error);
      alert("Login failed. Please check console for details.");
    }
  };
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      alert('Please enter your email address');
      return;
    }

    try {
      // Replace with your actual forgot password service call
      await LoginService.forgotPassword(forgotEmail);
      setForgotEmailSent(true);
    } catch (error) {
      alert('Error sending password reset email');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow login-card" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-primary text-center">Login</h3>

        {invalidCredentials && (
          <div className="alert alert-danger text-center" role="alert">
            Invalid email or password
          </div>
        )}

        {!showForgotPassword ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                  <input
                    type="email"
                    className={`form-control ${errors.email || invalidCredentials ? 'is-invalid' : ''}`}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label>Password</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                  <input
                    type="password"
                    className={`form-control ${errors.password || invalidCredentials ? 'is-invalid' : ''}`}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <label>Role</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-person-badge-fill"></i></span>
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
                </div>
                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                <i className="bi bi-box-arrow-in-right me-2"></i>Login
              </button>

              <div className="text-center mb-3">
                <button 
                  type="button" 
                  className="btn btn-link text-decoration-none"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>

              <div className="text-center">
                <p className="mb-0">Don't have an account?</p>
                <Link to="/register" className="btn btn-outline-primary mt-2">
                  Create Account
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="forgot-password-form">
            {forgotEmailSent ? (
              <>
                <div className="alert alert-success text-center">
                  Password reset link has been sent to your email
                </div>
                <button 
                  className="btn btn-secondary w-100"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotEmailSent(false);
                  }}
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                <h5 className="mb-3 text-center">Forgot Password</h5>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
                
                <div className="mb-3">
                  <label>Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                    <input
                      type="email"
                      className="form-control"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button 
                  className="btn btn-primary w-100 mb-3"
                  onClick={handleForgotPassword}
                >
                  Send Reset Link
                </button>

                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;