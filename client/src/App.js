import React from "react";
import "./App.css";
import SiteHeader from "./Components/SiteHeader/SiteHeader.js";
import Books from "./pages/Books";

function App() {
  return (
    <>
      <SiteHeader />
      <Books />
    </>
  );
}

export default App;
