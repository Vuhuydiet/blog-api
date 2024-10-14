
function AccountNavContainer({ isLoggedIn, setIsLoggedIn, setShownPage }) {

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShownPage('index');
  }

  return (
    <nav>
      {!isLoggedIn && <button onClick={() => setShownPage('login')}>Login</button>}
      {!isLoggedIn && <button onClick={() => setShownPage('register')}>Register</button>}
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  )
}

export default AccountNavContainer;