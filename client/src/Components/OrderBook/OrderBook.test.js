import { fireEvent, render, screen } from "@testing-library/react";
import OrderBook from "./OrderBook";

test("Can't decrement amount to order less than 0", () => {
  const testBook = [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      quantity: 4,
    },
  ];
  render(
    <OrderBook
      book={{
        title: "Harry Potter",
        author: "J.K. Rowling",
        quantity: 4,
      }}
    />
  );

  const decBtn = screen.getByTestId("dec-amount-btn");
  const amountInput = screen.getByTestId("order-amount-input");

  expect(amountInput.value).toBe("0");
  expect(decBtn).toBeDisabled();
});
