import React, { useState } from 'react';
import './SiteHeader.css';
import ButtonComponent from '../abstract/buttonComponent';

export default function SiteHeader() {

  // states and username will be passed through useContext instead
  const [loggedInState, setLoggedInState] = useState(false);
  let username = "Bob";

  

  return (

    <header className='site-header-container'>
      <h1 className='site-header-h1'>Booksters Website</h1>
      <section className='site-header-section'>
        <p>{!loggedInState ? `Browsing as guest...` : `Browsing as user ${username}`}</p>
        {!loggedInState ? 
        <ButtonComponent 
          className={"sign-in-btn"}
          testId={"sign-in-btn"}
          onClick={() => {console.log("onClick reacted")}}
          txt={"Sign in"}
        /> : 
        <ButtonComponent 
          className={"sign-out-btn"}
          testId={"sign-out-btn"}
          onClick={() => {}}
          txt={"Sign out"}
        />}
      </section>
    </header>
  )
}
