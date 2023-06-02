/**
 * This file is for a custom hook to search for books
 * it uses State and effect to handle the fetch of books
 * It takes in a query parameter as well as the function to setAllBooks state
 * Listens for changes of the query parameter and triggers the fetch after a small delay to see if
 * the user types more
 */

import { useState, useEffect } from "react";
import fetchService from "../service/fetchService";

export default function useBookSearchApi(query, setAllBooks) {
  const [isLoading, setIsLoading] = useState(false);
  // const [dataState, setDataState] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      if (query === "") return setNoData(false);

      setIsLoading(true);

      try {
        setNoData(false);
        const result = await fetchService.searchBook(query);
        console.log(result);

        if (result.length === 0) {
          setNoData(true);
        }
        setAllBooks({ books: result });
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
