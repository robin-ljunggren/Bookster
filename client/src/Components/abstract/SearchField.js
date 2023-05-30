import React from "react";
import "./SearchField.css";

export default function SearchField({ placeholder, onChange }) {
  return <input className="search-box" type="text" placeholder={placeholder} onChange={onChange} />;
}
