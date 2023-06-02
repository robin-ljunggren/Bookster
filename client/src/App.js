/**
 * This file is the main app
 * It renders the Sites header and the router that serves
 * the Books or the Users pages
 */

import React from "react";
import "./App.css";
import SiteHeader from "./Components/SiteHeader/SiteHeader.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Books from "./pages/Books";
import Users from "./pages/Users";
import AuthProvider from "./context/authContext";
import UserProvider from "./context/userContext";

export default function App() {
  const routes = [
    {
      path: "/",
      element: <Books />,
    },
    {
      path: "/admin/users",
      element: <Users />,
    },
  ];

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <SiteHeader />
          <RouterProvider router={createBrowserRouter(routes)} />
        </UserProvider>
      </AuthProvider>
    </>
  );
}
