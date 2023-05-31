import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";

import "./styles/Users.css";
import { useCurrentUser } from "../context/userContext";
import NavigationComponent from "../Components/abstract/NavigationComponent/NavigationComponent";
import { Navigate } from "react-router-dom";
import ButtonComponent from "../Components/abstract/ButtonComponent";
import { useRef, useState, useEffect } from "react";
import PromoteDeletePopUp from "../Components/abstract/PromoteDeletePopUp";
import fetchService from "../service/fetchService";

export default function Users() {
  const currentUser = useCurrentUser();
  const [allUsers, setAllUsers] = useState([]);

  const promoteDeleteRef = useRef();
  const [actionState, setActionState] = useState({ method: "" });
  const [userContent, setUserContent] = useState({});

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
        <table className="users-table-styling">
          <THeadComponent
            col1={"Username"}
            col2={"Role"}
            col3={"Purchases"}
            action={"Action"}
          />
          <tbody>
            {allUsers.map((user) => (
              <TableRowComponent
                key={crypto.randomUUID()}
                col1={user.username}
                col2={user.role}
                col3={user.purchases ? user.purchases.length : "0"}
                action={
                  <div>
                    <ButtonComponent
                      className={'promote-btn'}
                      onClick={() => {
                        setActionState({ method: "Promote" });
                        setUserContent(user);
                        promoteDeleteRef.current.showModal();
                      }}
                      isDisabled={user.role === "ADMIN"}
                      txt={"Promote"}
                    />
                    <ButtonComponent
                      onClick={() => {
                        setActionState({ method: "Delete" });
                        setUserContent(user);
                        promoteDeleteRef.current.showModal();
                      }}
                      txt={"Delete"}
                    />
                  </div>
                }
              />
            ))}
          </tbody>
        </table>
      )}
      <dialog className="promote-delete-dialog" ref={promoteDeleteRef}>
        <PromoteDeletePopUp
          promoteDeleteRef={promoteDeleteRef}
          method={actionState.method}
          pageState={"users"}
          username={userContent.username}
        />
      </dialog>
    </>
  );
}
