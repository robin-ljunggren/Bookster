import React, { useState } from 'react';
import './SiteHeader.css';

export default function SiteHeader() {

  // states and username will be passed through useContext instead
  const [loggedInState, setLoggedInState] = useState(false);
  let username = "Bob";

  return (

    <header className='site-header-container'>
      <h1 className='site-header-h1'>Booksters Website</h1>
      <section className='site-header-section'>
        <p>{!loggedInState ? `Browsing as guest...` : `Browsing as user ${username}`}</p>
        <button>{!loggedInState ? "Sign in" : "Sign out"}</button>
      </section>
    </header>
  )
}
