import { useState } from "react";
import ButtonComponent from "../abstract/ButtonComponent";
import memoryService from "../../service/memoryService";
import fetchService from "../../service/fetchService";

export default function OrderBook({ book, setUpdate }) {
  const bookQty = book.quantity;
  const [bookToOrder, setBookToOrder] = useState({
    title: book.title,
    quantity: 0,
  });

  async function handleOrder() {
    const response = await fetchService.buyBook(bookToOrder);
    console.log("buy: ", response);
    setBookToOrder({ ...bookToOrder, quantity: 0 });
  }

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
        onClick={handleOrder}
        txt={"Order"}
        isDisabled={bookQty === 0}
      />
    </div>
  );
}
