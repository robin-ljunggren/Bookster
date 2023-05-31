import React, { useRef } from "react";
import "./SiteHeader.css";
import ButtonComponent from "../abstract/ButtonComponent.js";
import AuthForm from "../AuthForm/AuthForm";
import { useAuthState, useToggleAuthState } from "../../context/authContext";
import {
  useCurrentUser,
  useChangeCurrentUser,
} from "../../context/userContext";
import memoryService from "../../service/memoryService";

export default function SiteHeader() {
  // states and username will be passed through useContext instead
  const authState = useAuthState();
  const setAuthState = useToggleAuthState();
  const currentUser = useCurrentUser();
  const setCurrentUser = useChangeCurrentUser();
  const dialogRef = useRef();

  return (
    <header className="site-header-container">
      <h1 className="site-header-h1">Booksters Website</h1>
      <section className="site-header-section">
        <p className="browsing-as-text" data-testid="current-user">
          {!authState
            ? `Browsing as guest`
            : `Browsing as ${currentUser.role.toLowerCase()} ${
                currentUser.username
              }`}
        </p>
        {!authState ? (
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
            onClick={() => {
              memoryService.removeSessionValue("JWT_TOKEN");
              setAuthState(false);
              setCurrentUser({ username: "", role: "" });
            }}
            txt={"Sign out"}
          />
        )}
      </section>
      <dialog className="auth-form-dialog" ref={dialogRef}>
        <AuthForm dialogRef={dialogRef} />
      </dialog>
    </header>
  );
}
