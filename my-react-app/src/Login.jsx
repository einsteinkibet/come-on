import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserRole, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setUserId(data.userId);
        setUserRole(data.role);
        
        // Redirect based on the user role
        switch(data.role) {
          case 'Student':
            navigate('/student-dashboard');
            break;
          case 'Teacher':
            navigate('/teacher-dashboard');
            break;
          case 'Admin':
            navigate('/admin-dashboard');
            break;
          case 'Director':
            navigate('/director-dashboard');
            break;
          case 'Bursar':
            navigate('/bursar-dashboard');
            break;
          default:
            navigate('/login'); // fallback
        }
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login; // Ensure this is the default export
