/**
 * This file is for a input that is used as the searchfield on the page
 *  */

import React from "react";
import "./SearchField.css";

export default function SearchField({ placeholder, onChange, value }) {
  return (
    <input
      className="search-box"
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
