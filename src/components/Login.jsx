const COHORT_NAME = "2305-ftp-pt-web-pt";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/users/login`;

import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';


function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send a POST request to your login API endpoint
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ 
          user: {
          username, 
          password 
          } 
        }),
      });

      if (response.ok) {
        // Login successful, extract the token and log in
        const data = await response.json();
        window.localStorage.setItem("token", data.data.token);
        console.log("TOKEN", data.data.token)
        setToken(data.data.token);
        navigate("/listPosts")
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
