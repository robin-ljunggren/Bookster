import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useCurrentUser() {
  return useContext(UserContext);
}

export function useChangeCurrentUser() {
  return useContext(UserUpdateContext);
}

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({username:"", role:""});

  function changeCurrentUser(newUser) {
    setCurrentUser(newUser);
  }

  return (
    <UserContext.Provider value={currentUser}>
      <UserUpdateContext.Provider value={changeCurrentUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}