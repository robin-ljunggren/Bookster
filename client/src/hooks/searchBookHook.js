import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:4000/library/books";

export default function useBookSearchApi(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const queryString = `/search?q=${query}`;
  let booksUrl = baseURL + queryString;

  async function fetchBook() {
    // if (query === "") return false;
    setIsLoading(true);
    const response = await fetch(booksUrl);
    const data = await response.json();
    console.log("response data ", data);
    setData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchBookTimeout = setTimeout(() => {
      fetchBook();
    }, 2000);

    return () => clearTimeout(fetchBookTimeout);
  }, [query]);

  return { isLoading, data };
}
