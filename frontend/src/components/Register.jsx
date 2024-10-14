

function Register({ setShownPage }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get('username');
    const password = data.get('password');
    try {
      const response = await fetch('http://localhost:3000/api/register', {
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
    }
    catch(err) {
      console.error('An error occurred:', err);
    }
    setShownPage('index');
  }
  return (
    <>
      <h1>Register</h1>
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" id='username' name='username'/>
        <label htmlFor="password">Password: </label>
        <input type="password" id='password' name='password'/>
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register;