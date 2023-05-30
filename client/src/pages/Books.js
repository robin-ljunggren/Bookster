import { useEffect, useState } from "react";
import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";
import SearchField from "../Components/abstract/SearchField";
import useBookSearchApi from "../hooks/searchBookHook";
import "./styles/Books.css";
import { useCurrentUser } from "../context/userContext";
import NavigationComponent from "../Components/abstract/NavigationComponent";
import fetchService from "../service/fetchService";

export default function Books() {
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const { isLoading, noData } = useBookSearchApi(query, setAllBooks);

  useEffect(() => {
    if (query === "")
      fetchService.getAllBooks().then((result) => setAllBooks(result.books));
  }, [query]);

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
      {currentUser.role === "ADMIN" && <NavigationComponent />}
      {noData ? (
        <p>There is no book with that title or author</p>
      ) : isLoading ? (
        "Loading..."
      ) : (
        <table>
          <THeadComponent
            col1={"Title"}
            col2={"Author"}
            col3={"Quantity"}
            col4={"order"}
            action={"action"}
          />
          <tbody>
            {allBooks.map((book) => (
              <TableRowComponent
                key={crypto.randomUUID()}
                col1={book.title}
                col2={book.author}
                col3={book.quantity}
                col4={
                  book.quantity === 0 ? (
                    "Out of Stock"
                  ) : (
                    <OrderBook book={book} />
                  )
                }
                col5={"admintools"}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
