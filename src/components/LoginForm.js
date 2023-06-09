import React, { useState, useEffect } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin status

  useEffect(() => {
    checkAdminRole();
  }, []);

  const checkAdminRole = () => {
    const storedRole = localStorage.getItem('role');
    console.log("🚀 ~ file: LoginForm.js:16 ~ checkAdminRole ~ storedRole:", storedRole)
    setIsAdmin(storedRole === 'adminPassword'); // Check if the role is admin and set the state accordingly
  };


  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7107/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', response.status);
      const token = await response.text();
      console.log('Response content:', token);
      localStorage.setItem('token', token);
      
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('role', 'adminPassword');
      }
      checkAdminRole();

      // ... rest of the code ...
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleAdminClick = () => {
    console.log('Admin button clicked');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAdmin(false);
    checkAdminRole();
  };

  return (
    <div>
        {!isAdmin && (
        <form onSubmit={handleSubmitLogin} className="dark-form">
        <div>
            <label className="dark-label">Username:</label>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="dark-input"
            />
        </div>
        <div>
            <label className="dark-label">Password:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="dark-input"
            />
        </div>
        <button type="submit" className="dark-button">Login</button>
        </form>
        )}
        {isAdmin && (
        <button onClick={handleAdminClick} className="dark-button">
            Logout
        </button>
        )}
    </div>

  );
}

export default LoginForm;
