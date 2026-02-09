import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/auth';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const cardStyle = { backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' };
const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', boxSizing: 'border-box' };
const buttonStyle = (color) => ({ width: '100%', padding: '0.5rem', backgroundColor: color, color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold' });

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('email', email);
        navigate('/profile');
      } else {
        alert(res.data.message || 'Login failed!');
      }
    } catch (err) {
      alert('Login failed! Is the backend running?');
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" style={buttonStyle('#3b82f6')}>Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        No account? <button onClick={() => navigate('/signup')} style={{ background: 'none', border: 'none', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>Sign Up</button>
      </p>
    </div>
  );
};

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/register`, { name, email, password });
      alert(res.data.message || 'Success! Now login.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed!');
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" style={inputStyle} value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" style={buttonStyle('#10b981')}>Sign Up</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Have an account? <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>Login</button>
      </p>
    </div>
  );
};

const Profile = () => {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Profile</h2>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p><strong>Welcome back!</strong></p>
        <p>{email}</p>
      </div>
      <button onClick={handleLogout} style={buttonStyle('#ef4444')}>Logout</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'sans-serif' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
