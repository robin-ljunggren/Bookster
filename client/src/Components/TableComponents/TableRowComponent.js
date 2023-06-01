/**
 * This file is for the component that makes out a table row of the
 * table body
 * To be used in the different pages renders of their result table
 * It uses the context of both auth and current user to determine
 * how many columns to render
 * The content of each column is to be provided as props
 */

import { useAuthState } from "../../context/authContext";
import { useCurrentUser } from "../../context/userContext";
import "./TableRowComponent.css";

export default function TableRowComponent({ col1, col2, col3, col4, action }) {
  const authState = useAuthState();
  const currentUser = useCurrentUser();
  const location = window.location.href;
  return (
    <tr className="trow">
      <td>{col1}</td>
      <td>{col2}</td>
      <td className="trow-col3">{col3}</td>
      {authState && location === "http://localhost:3000/" && (
        <td className="trow-col4">{col4}</td>
      )}
      {authState && currentUser.role === "ADMIN" && <td>{action}</td>}
    </tr>
  );
}
