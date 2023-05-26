import { useAuthState } from "../../context/authContext";
import { useCurrentUser } from "../../context/userContext";

export default function TableRowComponent({ col1, col2, col3, col4, col5 }) {
  const authState = useAuthState();
  const currentUser = useCurrentUser();
  return (
    <tr>
      <td>{col1}</td>
      <td>{col2}</td>
      <td>{col3}</td>
      {authState && <td>{col4}</td>}
      {authState && currentUser.role === "admin" && <td>{col5}</td>}
    </tr>
  );
}
