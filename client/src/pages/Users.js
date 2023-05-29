import { useState } from "react";
import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";
import SearchField from "../Components/abstract/SearchField";
import useUserSearchApi from "../hooks/searchUsersHook";
import './styles/Users.css';
import ButtonComponent from "../Components/abstract/ButtonComponent";
import { useCurrentUser } from "../context/userContext";


export default function Users() {
  const [query, setQuery] = useState("");
  useCurrentUser();
  const { isLoading, noData ,dataState } = useUserSearchApi(query);

  return (
    <>
      <section className="search-section">
        <SearchField
          placeholder={"Search user..."}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </section>
      <aside >
        <ButtonComponent txt={'Books'}/>
        <ButtonComponent txt={'User'} />
      </aside>
      {noData ? <p>There is no book with that title or author</p> :
       isLoading ? "Loading..." :
      <table>
        <THeadComponent
          col1={"Title"}
          col2={"Author"}
          col3={"Quantity"}
          col4={"order"}
          col5={"admin"}
        />
        <tbody>
            {dataState.map((book) => (
            <TableRowComponent
              key={crypto.randomUUID()}
              col1={book.title}
              col2={book.author}
              col3={book.quantity}
              col4={book.quantity === 0 ? 'Out of Stock' : <OrderBook book={book} />}
              col5={"admintools"}
            />
           ))}
        </tbody>
      </table>
      }
    </>
  );
}
