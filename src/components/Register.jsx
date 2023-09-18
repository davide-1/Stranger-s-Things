const COHORT_NAME = "2305-ftp-pt-web-pt";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/users/register`

import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Login from "./Login";


function Register({setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send a POST request to your registration API endpoint
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user: {
          username, 
          password
          },
        }),
      });
        // Registration successful, extract the token and log in
        const data = await response.json()
        // Store the token in sessionStorage
        window.localStorage.setItem("token", data.data.token)
        setToken(data.data.token);
        navigate("/listPosts")
     
     
    } catch (error) {
        console.error('An error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container-register-form">
      <h2 className="header-register-form">Register</h2>
      <form>
        <input
          className="input-register-form"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          className="input-register-form"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <input
          className="input-register-form"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /><br />
        <button className="button-register-form" type="button" onClick={handleRegister}>
          Register
        </button>
        {error && <p>{error}</p>}
      </form>
      <div>
      < Login setToken={setToken} />
    </div>
    </div>
  );
}

export default Register

