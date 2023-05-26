import React, { useContext, useState } from "react";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuthState() {
  return useContext(AuthContext);
}

export function useToggleAuthState() {
  return useContext(AuthUpdateContext);
}

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(false);

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
