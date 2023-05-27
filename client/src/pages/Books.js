import { useState } from "react";
import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";
import SearchField from "../Components/abstract/SearchField";
import useBookSearchApi from "../hooks/searchBookHook";

const testBook = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    quantity: 4,
  },
];

export default function Books() {
  const [query, setQuery] = useState("");

  const { isLoading, data } = useBookSearchApi(query);

  return (
    <>
      <section>
        <SearchField
          placeholder={"Search title/author..."}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </section>
      {isLoading ? "Loading..." :
      <table>
        <THeadComponent
          col1={"Title"}
          col2={"Author"}
          col3={"Quantity"}
          col4={"order"}
          col5={"admin"}
        />
        <tbody>
            {data.map((book) => (
            <TableRowComponent
              key={crypto.randomUUID()}
              col1={book.title}
              col2={book.author}
              col3={book.quantity}
              col4={<OrderBook book={book} />}
              col5={"admintools"}
            />
           ))}
        </tbody>
      </table>
      }
    </>
  );
}
