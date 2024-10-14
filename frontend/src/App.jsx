import { useState } from 'react';

import { jwtDecode } from 'jwt-decode';

import Login from './components/Login';
import Register from './components/Register';
import AccountNavContainer from './components/AccountNavContainer';

function isTokenExpired(token) {
  if (!token)
    return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp <= currentTime) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
}

function App() {
  const [shownPage, setShownPage] = useState('index');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (isTokenExpired(localStorage.getItem('token'))) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  });

  return (
    <>
      {!['login', 'register'].includes(shownPage) && <AccountNavContainer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setShownPage={setShownPage}/>}
      {shownPage === 'login' && <Login setIsLoggedIn={setIsLoggedIn} setShownPage={setShownPage}/>}
      {shownPage === 'register' && <Register setShownPage={setShownPage}/>}
      
    </>
  );
}

export default App;
