import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";
import SearchField from "../Components/abstract/SearchField";
import useUserSearchApi from "../hooks/searchUserHook";
import './styles/Users.css';
import { useCurrentUser } from "../context/userContext";
import NavigationComponent from "../Components/abstract/NavigationComponent";
import { Navigate } from "react-router-dom";
import ButtonComponent from "../Components/abstract/ButtonComponent";
import { useRef, useState } from "react";
import PromoteDeletePopUp from "../Components/abstract/PromoteDeletePopUp";


export default function Users() {
  const currentUser = useCurrentUser();
  const { isLoading ,dataState } = useUserSearchApi();
  const promoteDeleteRef = useRef();
  const [actionState, setActionState] = useState({method: ''});
  const [userContent, setUserContent] = useState({username: ''});

  if(currentUser.role !== "ADMIN") {
    return <Navigate to={"/"}/>
  }
  return (
    <>
      <section className="search-section">
        <SearchField
          placeholder={"Search user..."}
        />
      </section>
      {currentUser.role === "ADMIN" &&
        <NavigationComponent />
      }
      {isLoading ? "Loading..." :
      <table>
        <THeadComponent
          col1={"Username"}
          col2={"Role"}
          col3={"Purchases"}
          action={"Action"}
        />
        <tbody>
            {dataState.map((user) => (
            <TableRowComponent
              key={crypto.randomUUID()}
              col1={user.username}
              col2={user.role}
              col3={user.purchases? user.purchases.length : "0"}
              action={
                <div>
                  <ButtonComponent 
                    onClick={() => {
                      setActionState({method: "Promote"}); 
                      setUserContent({username: user.username}); 
                      promoteDeleteRef.current.showModal()
                    }} 
                    isDisabled={user.role === "ADMIN"} 
                    txt={'Promote'}
                    />
                  <ButtonComponent 
                    onClick={() => {
                      setActionState({method: "Delete"}); 
                      setUserContent({username: user.username}); 
                      promoteDeleteRef.current.showModal()
                    }} 
                    txt={"Delete"}
                  />
                </div>
              }
            />
           ))}
        </tbody>
      </table>
      }
      <dialog ref={promoteDeleteRef}>
        <PromoteDeletePopUp promoteDeleteRef={promoteDeleteRef} method={actionState.method} pageState={'users'} username={userContent.username}/>
      </dialog>
    </>
  );
}
