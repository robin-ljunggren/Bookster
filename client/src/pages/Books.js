import { useState, useRef, useEffect } from "react";
import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";
import SearchField from "../Components/abstract/SearchField";
import useBookSearchApi from "../hooks/searchBookHook";
import "./styles/Books.css";
import { useCurrentUser } from "../context/userContext";
import NavigationComponent from "../Components/abstract/NavigationComponent";
import ButtonComponent from "../Components/abstract/ButtonComponent";
import EditAddPopUp from "../Components/abstract/EditAddPopUp";
import PromoteDeletePopUp from "../Components/abstract/PromoteDeletePopUp";
import fetchService from "../service/fetchService";

export default function Books() {
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");
  const [actionState, setActionState] = useState({ method: "" });
  const [bookContent, setBookContent] = useState({});
  const promoteDeleteRef = useRef();
  const editAddRef = useRef();
  const [allBooks, setAllBooks] = useState({});
  const { isLoading, noData } = useBookSearchApi(query, setAllBooks);
  const [runtime, setRuntime] = useState(0);
  const [timeoutMs, setTimeoutMs] = useState(2000);
  const [miss, setMiss] = useState({count: 0, short: 4, medium: 7, long: 10});
  const [multiplier, setMultiplier] = useState({short: 1200, medium: 1600, long: 2000});
  

  async function shortPolling() {
    if(miss.count < 10) {
      console.log("miss count: ", miss.count)
      setMiss({...miss, count: miss.count + 1})
    }

    const result = await fetchService.getAllBooks();

    console.log("allBooks.V: ",allBooks.version);
    console.log("result.V: ",result.version);

    if(allBooks.version !== result.version) {
      setMiss({...miss, count: miss.count + 0});
      setAllBooks(result);
    }

    console.log('timeout: ', timeoutMs)
    if(miss.count < miss.short) {
      console.log('short');
      setTimeoutMs(timeoutMs => timeoutMs);
    }else if(miss.count > miss.short && miss.count < miss.medium) {
      console.log('medium')
      setTimeoutMs(timeoutMs => timeoutMs + (miss.count * multiplier.medium))
    }else if(miss.count > miss.medium && miss.count < miss.long){
      console.log('long')
      setTimeoutMs(timeoutMs => timeoutMs + (miss.count * multiplier.long))
    }
  }

  

  useEffect(() => {
    if(query === '');
    let shortPollTimeout = setTimeout(() => {
      shortPolling(); 
      setRuntime(runtime => runtime + 1)
      return () => clearTimeout(shortPollTimeout)
    }, timeoutMs)
    
  }, [query, runtime]);

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
      {currentUser.role === "ADMIN" && (
        <div>
          <ButtonComponent
            onClick={() => {
              setActionState({ method: "Add" });
              editAddRef.current.showModal();
            }}
            txt={"Add new book"}
          />
          <NavigationComponent />
        </div>
      )}
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
            col4={"Order"}
            action={"Action"}
          />
          <tbody>
            {allBooks.books &&
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
                      <OrderBook book={book} />
                    )
                  }
                  action={
                    <div>
                      <ButtonComponent
                        onClick={() => {
                          setActionState({ method: "Edit" });
                          editAddRef.current.showModal();
                          setBookContent(book);
                        }}
                        txt={"Edit"}
                      />
                      <ButtonComponent
                        onClick={() => {
                          setActionState({ method: "Delete" });
                          setBookContent(book);
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
      <dialog ref={editAddRef}>
        <EditAddPopUp
          editAddRef={editAddRef}
          method={actionState.method}
          book={bookContent}
        />
      </dialog>
      <dialog ref={promoteDeleteRef}>
        <PromoteDeletePopUp
          promoteDeleteRef={promoteDeleteRef}
          pageState={"books"}
          method={actionState.method}
          title={bookContent.title}
        />
      </dialog>
    </>
  );
}
