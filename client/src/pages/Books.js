import OrderBook from "../Components/OrderBook/OrderBook";
import THeadComponent from "../Components/TableComponents/THeadComponent";
import TableRowComponent from "../Components/TableComponents/TableRowComponent";

const testBook = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    quantity: 4,
  },
];

export default function Books() {
  return (
    <table>
      <THeadComponent
        col1={"Title"}
        col3={"Quantity"}
        col4={"order"}
        col5={"admin"}
      />
      <tbody>
        {testBook.map((book) => (
          <TableRowComponent
            col1={book.title}
            col3={book.quantity}
            col4={<OrderBook book={book} />}
            col5={"admintools"}
          />
        ))}
      </tbody>
    </table>
  );
}
