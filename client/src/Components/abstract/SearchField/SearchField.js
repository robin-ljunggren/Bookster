import React from "react";
import "./SearchField.css";

export default function SearchField({ placeholder, onChange, value }) {
  return <input className="search-box" type="text" placeholder={placeholder} onChange={onChange} value={value}/>;
}
