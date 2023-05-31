import React from "react";
import ButtonComponent from "./ButtonComponent";
import "./EditAddPopUp.css";

export default function EditAddPopUp({ editAddRef, method, book }) {
  return (
    <form>
      {/* <button onClick={(e) => {e.preventDefault(); editAddRef.current.close()}}>X</button> */}
      <h3 className="editAdd-header">{method} book</h3>
      <label className="title-styling">{method === "Add" ? "Title:" : `Title - ${book.title}`}</label>
      <input type="text" placeholder="Insert new title here" />
      <label className="author-styling">{method === "Add" ? "Author:" : `Author - ${book.author}`}</label>
      <input type="text" placeholder="Insert new author here" />
      <label className="quantity-styling">
        {method === "Add" ? "Quantity:" : `Quantity - ${book.quantity}`}
      </label>
      <input type="text" placeholder="Insert new quantity here" />
      <div>
        <ButtonComponent className={"btn-save-changes"} onClick={() => {}} txt={"Save changes"} />
        <ButtonComponent
          onClick={(e) => {
            e.preventDefault();
            editAddRef.current.close();
          }}
          txt={"Discard changes"}
        />
      </div>
    </form>
  );
}
