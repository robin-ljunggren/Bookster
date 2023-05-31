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
        setAllBooks({books: result});
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
