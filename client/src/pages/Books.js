/**
 * This file is for rendering the main Books page,
 * imports the components needed and renders a table from the result of the fetch of all books.
 */

import { useState, useRef, useEffect } from "react";
import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";
import SearchField from "../Components/abstract/SearchField/SearchField";
import useBookSearchApi from "../hooks/searchBookHook";
import "./styles/Books.css";
import { useCurrentUser } from "../context/userContext";
import NavigationComponent from "../Components/abstract/NavigationComponent/NavigationComponent";
import ButtonComponent from "../Components/abstract/ButtonComponent";
import EditAddPopUp from "../Components/abstract/EditAddPopUp";
import PromoteDeletePopUp from "../Components/abstract/PromoteDeletePopUp";
import fetchService from "../service/fetchService";
// import useShortPoll from "../hooks/shortPollHook";

export default function Books() {
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("");
  const [bookContent, setBookContent] = useState({
    current: { title: "", author: "", quantity: 0 },
    previous: {},
  });
  const [bookToDelete, setBookToDelete] = useState("");
  const [allBooks, setAllBooks] = useState({});
  const promoteDeleteRef = useRef();
  const editAddRef = useRef();

  const { isSearching, noData } = useBookSearchApi(query, setAllBooks);
  // const { timeoutMs } = useShortPoll(query, allBooks, setAllBooks);

  async function fetchAllBook() {
    const result = await fetchService.getAllBooks();
    setAllBooks(result);
  }

  useEffect(() => {
    if (query === "") {
      fetchAllBook();
    }
  }, [query]);

  return (
    <div className="page-wrapper">
      <div className="flex-container-bookspage">
        <section className="search-section">
          <SearchField
            value={query}
            placeholder={"Search title/author..."}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </section>
        {currentUser.role === "ADMIN" && (
          <>
            <ButtonComponent
              className={"add-btn"}
              onClick={() => {
                setMethod("POST");
                editAddRef.current.showModal();
              }}
              txt={"Add new book"}
            />
            <NavigationComponent />
          </>
        )}
      </div>
      <table className="books-table-styling">
        <THeadComponent
          col1={"Title"}
          col2={"Author"}
          col3={"Quantity"}
          col4={"Order"}
          action={"Action"}
        />
        <tbody>
          {noData ? (
            <p>There is no book with that title or author</p>
          ) : isSearching ? (
            <p>Searching after books...</p>
          ) : (
            allBooks.books &&
            allBooks.books.map((book) => (
              <TableRowComponent
                key={crypto.randomUUID()}
                col1={book.title}
                col2={book.author}
                col3={book.quantity}
                col4={
                  book.quantity === 0 ? (
                    "Out of Stock"
                  ) : (
                    <OrderBook
                      book={book}
                      setAllBooks={setAllBooks}
                      allBooks={allBooks}
                    />
                  )
                }
                action={
                  <div>
                    <ButtonComponent
                      className={"edit-btn"}
                      onClick={() => {
                        setMethod("PUT");
                        editAddRef.current.showModal();
                        setBookContent({
                          current: { ...book },
                          previous: { ...book },
                        });
                      }}
                      txt={"Edit"}
                    />
                    <ButtonComponent
                      onClick={() => {
                        setMethod("DELETE");
                        setBookToDelete(book.title);
                        promoteDeleteRef.current.showModal();
                      }}
                      txt={"Delete"}
                    />
                  </div>
                }
              />
            ))
          )}
        </tbody>
      </table>
      <dialog className="edit-dialog" ref={editAddRef}>
        <EditAddPopUp
          editAddRef={editAddRef}
          method={method}
          bookContent={bookContent}
          setBookContent={setBookContent}
          setListState={setAllBooks}
          listState={allBooks}
        />
      </dialog>
      <dialog className="promote-dialog" ref={promoteDeleteRef}>
        <PromoteDeletePopUp
          promoteDeleteRef={promoteDeleteRef}
          pageState={"books"}
          method={method}
          title={bookToDelete}
          setListState={setAllBooks}
          listState={allBooks}
        />
      </dialog>
    </div>
  );
}
