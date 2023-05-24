import React, { useState } from 'react';
import './SiteHeader.css';

export default function SiteHeader() {

  // states and username will be passed through useContext instead
  const [userState, setUserState] = useState('guest');
  const [loginState, setLoginState] = useState(true);
  let username = "user";

  return (
    <div>
      {loginState && (
        <header className='site-header-container-login'>
          <h1 className='site-header-h1-login'>Booksters Website</h1>
        </header>
      )};
      {!loginState && (
        <header className='site-header-container'>
          <h1 className='site-header-h1'>Booksters Website</h1>
          <section className='site-header-section'>
            <p>{userState === 'guest' ? `Browsing as guest...` : `Browsing as user ${username}`}</p>
            <button>{userState === 'guest' ? "Sign in" : "Sign out"}</button>
          </section>
        </header>
      )};
    </div>
  )
}
