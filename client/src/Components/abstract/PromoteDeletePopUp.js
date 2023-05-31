import React from "react";
import ButtonComponent from "./ButtonComponent";
import fetchService from "../../service/fetchService";
import "./PromoteDeletePopUp.css";
export default function PromoteDeletePopUp({
  promoteDeleteRef,
  pageState,
  method,
  title,
  username,
  setListState,
  listState,
}) {
  async function handleMethod() {
    const body = pageState === "books" ? { title } : { username };
    const result =
      pageState === "books" && method === "DELETE"
        ? await fetchService.adminBooks(method, body)
        : await fetchService.adminUsers(method, body);

    console.log(result);
    alert(result.message);
    if (listState.version !== result.context.version)
      setListState(result.context);
    promoteDeleteRef.current.close();
  }

  return (
    <article>
      {method === "DELETE" && (
        <h3 className="delete-header">
          {pageState === "books" ? "Delete book" : "Delete user"}
        </h3>
      )}
      {method === "PUT" && (
        <h3 className="promote-header">Change users role</h3>
      )}
      <p>{`Are you sure you wish to ${
        method === "DELETE" ? "delete" : "promote"
      } 
        ${pageState === "books" ? "book" : "user"} 
        ${
          pageState === "books"
            ? title
            : method === "PUT"
            ? `${username} to admin`
            : username
        }`}</p>
      <div>
        <ButtonComponent
          className="btn-promote-delete"
          txt={method === "PUT" ? "Promote" : "Delete"}
          onClick={handleMethod}
        />
        <ButtonComponent
          onClick={(e) => {
            e.preventDefault();
            promoteDeleteRef.current.close();
          }}
          txt={"Cancel"}
        />
      </div>
    </article>
  );
}
