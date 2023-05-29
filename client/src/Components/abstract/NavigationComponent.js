import React from 'react'
import { NavLink } from 'react-router-dom';

export default function NavigationComponent() {
  return (
    <aside>
      <NavLink 
        to={"/"}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>Books</NavLink>
      <NavLink 
        to={"/admin/users"}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
      }>Users</NavLink>
    </aside>
  )
}
