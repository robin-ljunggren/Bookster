import React, { useState } from "react";
import ButtonComponent from "../abstract/ButtonComponent.js";
import authService from "../../service/authService.js";
import { useChangeCurrentUser } from "../../context/userContext.js";
import { useToggleAuthState } from "../../context/authContext.js";
import jwtUtil from "../../util/jwtUtil.js";

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
      <p>
        No account? Sign up{" "}
        <span
          data-testid="toggle-form-span"
          className="login/register-span"
          onClick={() => setFormState("register")}>
          here!
        </span>
      </p>
    ) : (
      <p>
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
    } else if (formState === "registration") {
      authService.registration(credentials.username, credentials.password);
    }
  }

  return (
    <form data-testid="auth-form" onSubmit={handleSubmit}>
      <h2 className="form-header" data-testid="auth-form-title">
        {formState === "login" ? "Sign in" : "Register"}
      </h2>
      <label>Username:</label>
      <input
        data-testid="auth-input-username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        placeholder="Type your username..."
      />
      <label>Password:</label>
      <input
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
          className={"login-btn"}
          testId={"login-btn"}
          txt={"Sign in"}
        />
      ) : (
        <ButtonComponent
          className={"register-btn"}
          testId={"register-btn"}
          txt={"Register new account"}
        />
      )}
      <button
        type="reset"
        className="btn guest-btn"
        onClick={() => dialogRef.current.close()}>
        Proceed as guest
      </button>
    </form>
  );
}
