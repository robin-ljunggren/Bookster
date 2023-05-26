import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:4000/library/books";

export default function useBookSearchApi(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  let queryString = `/search?q=${query}`;

  let searchUrl = baseURL;

  async function fetchBook() {
    if(query != '') {
      searchUrl = baseURL + queryString;
    }
    console.log(searchUrl);
    setIsLoading(true);
    const response = await fetch(searchUrl);
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
