import React, { useContext, useState } from "react";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useLoggedInState() {
  return useContext(AuthContext);
}

export function useLoggedInStateToggle() {
  return useContext(AuthUpdateContext);
}

export default function AuthProvider({ children }) {
  const [loggedInState, setLoggedInState] = useState(false);

  function toggleLoggedInState() {
    setLoggedInState((prevLoggedInState) => !prevLoggedInState);
  }

  return (
    <AuthContext.Provider value={loggedInState}>
      <AuthUpdateContext value={toggleLoggedInState}>
        {children}
      </AuthUpdateContext>
    </AuthContext.Provider>
  );
}
