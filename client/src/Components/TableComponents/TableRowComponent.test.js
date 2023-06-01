import { render, screen } from "@testing-library/react";
import TableRowComponent from "./TableRowComponent";

test("that a book renders in the table ", () => {
  const books = [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      quantity: 10,
    },
    {
      title: "Jack Reacher",
      author: "Lee Child",
      quantity: 5,
    },
  ];
  render(
    <table>
      <tbody>
        {books.map((book) => (
          <TableRowComponent
            key={book.title}
            col1={book.title}
            col2={book.author}
            col3={book.quantity}
          />
        ))}
      </tbody>
    </table>
  );

  const book1Title = screen.getByText("Harry Potter");
  const book2Qty = screen.getByText(5);

  expect(book1Title).toBeInTheDocument();
  expect(book2Qty).toBeInTheDocument();
});
