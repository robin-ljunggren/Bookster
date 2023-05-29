import { useState, useRef } from "react";
import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";
import SearchField from "../Components/abstract/SearchField";
import useBookSearchApi from "../hooks/searchBookHook";
import './styles/Books.css';
import { useCurrentUser } from "../context/userContext";
import NavigationComponent from "../Components/abstract/NavigationComponent";
import ButtonComponent from "../Components/abstract/ButtonComponent";
import PopUpComponent from "../Components/abstract/PopUpComponent";

export default function Books() {
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");
  const { isLoading, noData, dataState } = useBookSearchApi(query);
  const [actionState, setActionState] = useState();
  const dialogRef = useRef();

  return (
    <>
      <section className="search-section">
        <SearchField
          placeholder={"Search title/author..."}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </section>
      {currentUser.role === "ADMIN" &&
        <div>
          <ButtonComponent onClick={() => setActionState("Add")} txt={"Add new book"}/>
          <NavigationComponent />
        </div>
      }
      {noData ? <p>There is no book with that title or author</p> :
       isLoading ? "Loading..." :
      <table>
        <THeadComponent
          col1={"Title"}
          col2={"Author"}
          col3={"Quantity"}
          col4={"Order"}
          action={"Action"}
        />
        <tbody>
            {dataState.map((book) => (
            <TableRowComponent
              key={crypto.randomUUID()}
              col1={book.title}
              col2={book.author}
              col3={book.quantity}
              col4={book.quantity === 0 ? 'Out of Stock' : <OrderBook book={book} />}
              action={
                <div>
                  <ButtonComponent onClick={() => setActionState("Edit")} txt={"Edit"}/>
                  <ButtonComponent onClick={() => setActionState("Delete")} txt={"Delete"}/>
                </div>
              }
            />
           ))}
        </tbody>
      </table>
      }
      <dialog dialogRef= {dialogRef}>
        <PopUpComponent title={actionState} />
      </dialog>
    </>
  );
}
