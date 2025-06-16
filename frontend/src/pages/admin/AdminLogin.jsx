import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = React.useContext(AdminContext);
  const navigate = useNavigate();
  
  // Generate captcha
  useEffect(() => {
    generateCaptcha();
  }, []);
  
  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (userCaptcha.toLowerCase() !== captcha.toLowerCase()) {
      setError('Captcha does not match');
      setLoading(false);
      generateCaptcha();
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        // Temporary workaround for dashboard issue
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
        generateCaptcha();
      }
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">King Market</div>
          <h1>Admin Portal</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Admin ID</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin ID"
              required
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>
          
          <div className="captcha-container">
            <div className="captcha-display">
              <span>{captcha}</span>
              <button 
                type="button" 
                onClick={generateCaptcha} 
                className="refresh-btn"
                aria-label="Refresh captcha"
              >
                ↻
              </button>
            </div>
            <input
              type="text"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              placeholder="Enter captcha"
              required
              autoComplete="off"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        
        <div className="security-note">
          <div className="shield-icon">🛡️</div>
          <p>This system is for authorized personnel only. All activities are monitored.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;