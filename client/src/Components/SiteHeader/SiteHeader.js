import React, { useRef, useState } from "react";
import "./SiteHeader.css";
import ButtonComponent from "../abstract/ButtonComponent.js";
import AuthForm from "../AuthForm/AuthForm";

export default function SiteHeader() {
  // states and username will be passed through useContext instead
  const [loggedInState, setLoggedInState] = useState(false);
  const dialogRef = useRef();
  let username = "Bob";

  console.log("render");

  return (
    <header className="site-header-container">
      <h1 className="site-header-h1">Booksters Website</h1>
      <section className="site-header-section">
        <p>
          {!loggedInState
            ? `Browsing as guest...`
            : `Browsing as user ${username}`}
        </p>
        {!loggedInState ? (
          <ButtonComponent
            className={"sign-in-btn"}
            testId={"sign-in-btn"}
            onClick={() => {
              dialogRef.current.showModal();
            }}
            txt={"Sign in"}
          />
        ) : (
          <ButtonComponent
            className={"sign-out-btn"}
            testId={"sign-out-btn"}
            onClick={() => {}}
            txt={"Sign out"}
          />
        )}
      </section>
      <dialog ref={dialogRef}>
        <AuthForm dialogRef={dialogRef} />
      </dialog>
    </header>
  );
}
