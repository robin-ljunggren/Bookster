/**
 * This file is for a custom hook used to do a short poll to the backend server
 * It takes a parameter for the interval on which it should be run
 * It takes parameters for the allBooks state to update if the version has changed.
 * It takes a parameter for the search query to stop while the user searches for a book.
 */

import { useEffect, useRef } from "react";
import fetchService from "../service/fetchService";

export default function useShortPoll(
  query,
  allBooks,
  setAllBooks,
  interval = 10_000
) {
  const timeoutIdRef = useRef(null);
  useEffect(() => {
    let stopped = false;

    async function pollingCallback() {
      try {
        console.log("polling");
        await fetchService.getAllBooks().then((data) => {
          if (allBooks?.version !== data.version) {
            setAllBooks(data);
          }
        });
      } finally {
        if (!stopped)
          timeoutIdRef.current = setTimeout(pollingCallback, interval);
      }
    }

    if (query === "" && !stopped) pollingCallback();

    return () => {
      stopped = true;
      clearTimeout(timeoutIdRef.current);
    };
  }, [interval, allBooks, setAllBooks, query]);
}
