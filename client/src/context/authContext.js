/**
 * A file for a context to provide the authentication state
 * exports the provider and two functions to use and update the state
 */

import React, { useContext, useState } from "react";
import authService from "../service/authService";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuthState() {
  return useContext(AuthContext);
}

export function useToggleAuthState() {
  return useContext(AuthUpdateContext);
}

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(authService.checkAuth().isValid);

  function toggleAuthState() {
    setAuthState((prevAuthState) => !prevAuthState);
  }

  return (
    <AuthContext.Provider value={authState}>
      <AuthUpdateContext.Provider value={toggleAuthState}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
