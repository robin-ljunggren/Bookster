import { useState, useEffect } from "react";

export default function useBookSearchApi(query, setAllBooks) {
  const [isLoading, setIsLoading] = useState(false);
  // const [dataState, setDataState] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      if (query === "") return setNoData(false);

      const searchUrl = "http://127.0.0.1:4000/library/books/search?q=" + query;

      setIsLoading(true);

      try {
        setNoData(false);
        const response = await fetch(searchUrl);
        let data = await response.json();
        if (data.length === 0) {
          setNoData(true);
        }
        setAllBooks(data);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    const fetchBookTimeout = setTimeout(() => {
      fetchBook();
    }, 2000);

    return () => clearTimeout(fetchBookTimeout);
  }, [query]);

  return { isLoading, noData };
}
