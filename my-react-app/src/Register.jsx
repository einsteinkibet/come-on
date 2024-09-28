import React, { useState } from 'react';

const Register = ({ setUserRole, setUserId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Implement the registration logic here
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {  // Change to your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();

      if (response.ok) {
        // Assuming the API returns the user ID and role upon successful registration
        setUserId(data.userId);
        setUserRole(data.role);
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
        <option value="Admin">Admin</option>
        <option value="Director">Director</option>
        <option value="Bursar">Bursar</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register; // Ensure this is the default export
