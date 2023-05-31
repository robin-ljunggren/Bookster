import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import fetchService from "../../service/fetchService";

const initialState = {
  current: { title: "", author: "", quantity: 0 },
  previous: {},
};

export default function EditAddPopUp({
  editAddRef,
  method,
  bookContent,
  setBookContent,
  listState,
  setListState,
}) {
  console.log("bookContent: ", bookContent);
  // const [bookToChange, setBookToChange] = useState(book);

  async function handleMethod() {
    const body =
      method === "POST"
        ? { bookContent }
        : {
            previous: { title: bookContent.previous.title },
            current: { ...bookContent.current },
          };
    const result = await fetchService.adminBooks(method, body);

    alert(result.message);
    if (listState.version !== result.context.version)
      setListState(result.context);
    setBookContent(initialState);
    editAddRef.current.close();
  }

  return (
    <form>
      {/* <button onClick={(e) => {e.preventDefault(); editAddRef.current.close()}}>X</button> */}
      <h3>{method === "POST" ? "Add" : "Edit"} book</h3>
      <label>
        {method === "POST" ? "Title" : `Title - ${bookContent.previous.title}`}
      </label>
      <input
        type="text"
        placeholder="Insert new title here"
        value={bookContent.current.title}
        onChange={(e) =>
          setBookContent({
            ...bookContent,
            current: { ...bookContent.current, title: e.target.value },
          })
        }
      />
      <label>
        {method === "POST"
          ? "Author"
          : `Author - ${bookContent.previous.author}`}
      </label>
      <input
        type="text"
        placeholder="Insert new author here"
        value={bookContent.current.author}
        onChange={(e) =>
          setBookContent({
            ...bookContent,
            current: { ...bookContent.current, author: e.target.value },
          })
        }
      />
      <label>
        {method === "POST"
          ? "Quantity"
          : `Quantity - ${bookContent.previous.quantity}`}
      </label>
      <input
        type="number"
        placeholder="Insert new quantity here"
        value={bookContent.current.quantity}
        onChange={(e) =>
          setBookContent({
            ...bookContent,
            current: {
              ...bookContent.current,
              quantity: Number(e.target.value),
            },
          })
        }
      />
      <div>
        <ButtonComponent onClick={handleMethod} txt={"Save changes"} />
        <ButtonComponent
          onClick={(e) => {
            e.preventDefault();
            setBookContent(initialState);
            editAddRef.current.close();
          }}
          txt={"Discard changes"}
        />
      </div>
    </form>
  );
}
