/**
 * This file is for a navigation component that renders 2 links to navigate between the pages users and books
 */

import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationComponent.css";

export default function NavigationComponent() {
  return (
    <aside>
      <NavLink
        to={"/"}
        style={({ isActive }) => {
          return {
            display: "inline-block",
            textDecoration: "none",
            backgroundColor: isActive ? "grey" : "lightgrey",
            color: isActive ? "white" : "black",
            padding: ".5em",
            // margin: '1em .5em 1em 2.1em',
            borderRadius: "6%",
          };
        }}>
        Books
      </NavLink>
      <NavLink
        data-testid="admin-nav-users"
        to={"/admin/users"}
        style={({ isActive }) => {
          return {
            display: "inline-block",
            textDecoration: "none",
            backgroundColor: isActive ? "grey" : "lightgrey",
            color: isActive ? "white" : "black",
            padding: ".5em",
            borderRadius: "6%",
          };
        }}>
        Users
      </NavLink>
    </aside>
  );
}
