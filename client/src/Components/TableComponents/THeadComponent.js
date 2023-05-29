import { useAuthState } from "../../context/authContext";
import { useCurrentUser } from "../../context/userContext";
import "./THeadComponent.css";

export default function THeadComponent({ col1, col2, col3, col4, action }) {
  const authState = useAuthState();
  const currentUser = useCurrentUser();
  const location = window.location.href;

  return (
    <thead>
      <tr className="thead">
        <th>{col1}</th>
        <th>{col2}</th>
        <th>{col3}</th>
        {authState && location === "http://localhost:3000/" && <th>{col4}</th>}
        {authState && currentUser.role === "ADMIN" && <th>{action}</th>}
      </tr>
    </thead>
  );
}
