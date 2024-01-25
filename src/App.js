import React, { useState,useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  useEffect(()=>{
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')
          // console.log(storedUserLoggedInInformation)
      if(storedUserLoggedInInformation === '1'){
          setIsLoggedIn(true)
      }
  },[]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    //when i enter credential and click btn to update the state and re-render the component
    //then they could not store credential persistently this is first problem
    //when enter credential and click btn then the redirect dashboard page but when reload the dashboard then it will 
    //redirect to login page
    console.log(email,password)
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
