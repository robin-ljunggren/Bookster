import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";
import SearchField from "../Components/abstract/SearchField";
import useUserSearchApi from "../hooks/searchUserHook";
import "./styles/Users.css";
import { useCurrentUser } from "../context/userContext";
import NavigationComponent from "../Components/abstract/NavigationComponent";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchService from "../service/fetchService";

export default function Users() {
  const currentUser = useCurrentUser();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchService.getAllUsers().then((result) => setAllUsers(result.users));
  }, []);

  if (currentUser.role !== "ADMIN") {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      {currentUser.role === "ADMIN" && <NavigationComponent />}
      {allUsers.length <= 0 ? (
        "Loading..."
      ) : (
        <table>
          <THeadComponent
            col1={"Username"}
            col2={"Role"}
            col3={"Purchases"}
            action={"action"}
          />
          <tbody>
            {allUsers.map((user) => (
              <TableRowComponent
                key={crypto.randomUUID()}
                col1={user.username}
                col2={user.role}
                col3={user.purchases ? user.purchases.length : "0"}
                action={"action"}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
