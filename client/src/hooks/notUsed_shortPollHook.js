import React, { useEffect, useState } from "react";
import fetchService from "../service/fetchService";

export default function useShortPoll(query, allBooks, setAllBooks) {
  const [timeoutMs, setTimeoutMs] = useState(2000);
  const [missCount, setMissCount] = useState(0);

  const [runtime, setRuntime] = useState(0);

  const multiplier = {
    min: 1200,
    medium: 1600,
    max: 2000,
  };
  const miss = { min: 2, medium: 4, max: 7 };

  async function shortPolling() {
    const result = await fetchService.getAllBooks();

    if (allBooks.version === result.version) {
      console.log("version match");
      if (missCount < miss.max) {
        setMissCount((missCount) => missCount + 1);
      }
    } else {
      console.log("version missmatch");
      setMissCount(0);
      setAllBooks(result);
    }

    if (missCount < miss.min) {
      setTimeoutMs((timeoutMs) => timeoutMs + missCount * multiplier.min);
    } else if (missCount > miss.min && missCount < miss.medium) {
      setTimeoutMs((timeoutMs) => timeoutMs + missCount * multiplier.medium);
    } else if (missCount > miss.medium && missCount < miss.max) {
      setTimeoutMs((timeoutMs) => timeoutMs + missCount * multiplier.max);
    }
  }

  useEffect(() => {
    if (query === "") {
      let shortPollTimeout = setTimeout(() => {
        shortPolling();
        setRuntime((runtime) => runtime + 1);
        console.log(timeoutMs);
      }, timeoutMs);
      return () => clearTimeout(shortPollTimeout);
    }
  }, [query, runtime]);

  return { timeoutMs };
}
