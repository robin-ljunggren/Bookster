import React, { useState } from "react";
import ButtonComponent from "../abstract/ButtonComponent.js";
import authService from "../../service/authService.js";
import { useChangeCurrentUser } from "../../context/userContext.js";
import { useToggleAuthState } from "../../context/authContext.js";
import jwtUtil from "../../util/jwtUtil.js";
import "./AuthForm.css";

export default function AuthForm({ dialogRef }) {
  const [formState, setFormState] = useState("login");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const setCurrentUser = useChangeCurrentUser();
  const setAuthState = useToggleAuthState();

  const link =
    formState === "login" ? (
      <p className="signup-styling">
        No account? Sign up{" "}
        <span
          data-testid="toggle-form-span"
          className="login/register-span"
          onClick={() => setFormState("register")}>
          here!
        </span>
      </p>
    ) : (
      <p className="signin-styling">
        Already have an account? Sign in{" "}
        <span
          data-testid="toggle-form-span"
          className="login/register-span"
          onClick={() => setFormState("login")}>
          here!
        </span>
      </p>
    );

  async function handleSubmit(e) {
    e.preventDefault();

    if (formState === "login") {
      let resp = await authService.login(
        credentials.username,
        credentials.password
      );

      if (resp.status === 200) {
        const { username, role } = jwtUtil.parsePayload(resp.data.accessToken);

        setCurrentUser({ username, role });
        setAuthState(true);

        dialogRef.current.close();
      } else if (resp.status >= 400) {
        alert(resp.data?.error);
      }
    } else if (formState === "register") {
      let resp = await authService.registration(
        credentials.username,
        credentials.password
      );
      if (resp.status === 201) {
        alert("Successfully registered!");
        setFormState("login");
      } else if (resp.status >= 400) {
        alert(resp.data?.error);
      }
    }
  }

  return (
    <form className="auth-form" data-testid="auth-form" onSubmit={handleSubmit}>
      <h2 className="form-header" data-testid="auth-form-title">
        {formState === "login" ? "Sign in" : "Register"}
      </h2>
      <label className="username-header">Username:</label>
      <input className="username-box"
        data-testid="auth-input-username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        placeholder="Type your username..."
      />
      <label className="password-header">Password:</label>
      <input className="password-box"
        data-testid="auth-input-password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        placeholder="Type your password..."
      />
      {link}
      {formState === "login" ? (
        <ButtonComponent
          type="submit"
          className={"login-btn"}
          testId={"login-btn"}
          txt={"Sign in"}
          // onClick={handleSubmit}
        />
      ) : (
        <ButtonComponent
          className={"register-btn"}
          testId={"register-btn"}
          txt={"Register new account"}
          // onClick={handleSubmit}
          type="submit"
        />
      )}
      <button
        type="reset"
        className="btn-guest-btn"
        onClick={() => dialogRef.current.close()}
        >
        Proceed as guest
      </button>
    </form>
  );
}
