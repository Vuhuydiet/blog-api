import { useState } from 'react';

function Login({ setShownPage, setIsLoggedIn }) {

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get('username');
    const password = data.get('password');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const { err } = await response.json();
        throw new Error(err);
      }

      const { token, exp } = await response.json();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    }
    catch(err) {
      console.error('An error occurred:', err);
    }
    setShownPage('index');
  }

  return (
    <>
      <h1>Login</h1>
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" id='username' name='username'/>
        <label htmlFor="password">Password: </label>
        <input type="password" id='password' name='password'/>
        <button type="submit">Login</button>
      </form>    
    </>
  )
}

export default Login;