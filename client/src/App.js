import React from "react";
import "./App.css";
import SiteHeader from "./Components/SiteHeader/SiteHeader.js";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Books from "./pages/Books";
import Users from "./pages/Users";


export default function App() {

  const routes = [
    {
      path: "/",
      element: <Books />
    },
    {
      path: "/admin/users",
      element: <Users />
    }
  ]

  return (

    <>
      <SiteHeader />
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
};
