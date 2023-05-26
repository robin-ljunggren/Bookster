import { useAuthState } from "../../context/authContext";
import { useCurrentUser } from "../../context/userContext";

export default function THeadComponent({ col1, col2, col3, col4, col5 }) {
  const authState = useAuthState();
  const currentUser = useCurrentUser();
  return (
    <thead>
      <tr>
        <th>{col1}</th>
        <th>{col2}</th>
        <th>{col3}</th>
        {authState && <th>{col4}</th>}
        {authState && currentUser.role === "admin" && <th>{col5}</th>}
      </tr>
    </thead>
  );
}
