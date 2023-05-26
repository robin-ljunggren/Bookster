import { useState } from "react";
import ButtonComponent from "../abstract/ButtonComponent";

export default function OrderBook({ book }) {
  const [bookQty, setBookQty] = useState(book.quantity);
  const [bookToOrder, setBookToOrder] = useState({
    title: book.title,
    quantity: 0,
  });
  return (
    <div>
      <ButtonComponent
        className={"dec-amount-btn"}
        testId={"dec-amount-btn"}
        onClick={() => {
          setBookToOrder({
            ...bookToOrder,
            quantity: bookToOrder.quantity - 1,
          });
        }}
        txt={"-"}
        isDisabled={bookToOrder.quantity <= 0}
      />
      <input
        data-testid="order-amount-input"
        type="number"
        value={bookToOrder.quantity}
        onChange={(e) => {
          if (e.target.value >= 0 && e.target.value <= Number(bookQty)) {
            setBookToOrder({
              ...bookToOrder,
              quantity: Number(e.target.value),
            });
          }
        }}
      />
      <ButtonComponent
        className={"inc-amount-btn"}
        testId={"inc-amount-btn"}
        onClick={() => {
          setBookToOrder({
            ...bookToOrder,
            quantity: bookToOrder.quantity + 1,
          });
        }}
        txt={"+"}
        isDisabled={bookToOrder.quantity >= bookQty}
      />
      <ButtonComponent
        className={"order-btn"}
        testId={"order-btn"}
        onClick={() => {}}
        txt={"Order"}
      />
    </div>
  );
}
