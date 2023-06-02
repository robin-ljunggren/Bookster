/**
 * A file for a context to provide the current user state
 * exports the provider and two functions to use and update the state
 */

import React, { useContext, useState } from "react";
import authService from "../service/authService";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useCurrentUser() {
  return useContext(UserContext);
}

export function useChangeCurrentUser() {
  return useContext(UserUpdateContext);
}

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    authService.checkAuth().userDetails
  );

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
