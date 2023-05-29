import { fireEvent, render, screen } from "@testing-library/react";
import OrderBook from "./OrderBook";

test("Can't decrement amount to order less than 0", () => {
  render(
    <OrderBook
      book={{
        title: "Harry Potter",
        author: "J.K. Rowling",
        quantity: 0,
      }}
    />
  );

  const decBtn = screen.getByTestId("dec-amount-btn");
  const amountInput = screen.getByTestId("order-amount-input");

  expect(amountInput.value).toBe("0");
  expect(decBtn).toBeDisabled();
});

test("Can't increment amount to order more than what's in stock", () => {
  render(
    <OrderBook
      book={{
        title: "Harry Potter",
        author: "J.K. Rowling",
        quantity: 1,
      }}
    />
  );

  const incBtn = screen.getByTestId("inc-amount-btn");
  const amountInput = screen.getByTestId("order-amount-input");

  fireEvent.click(incBtn);

  expect(amountInput.value).toBe("1");
  expect(incBtn).toBeDisabled();
});
