import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:4000/library/books";

export default function useBookSearchApi(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  

  useEffect(() => {

    async function fetchBook() {
      let searchUrl;
      if(query === undefined || query === '') {
        searchUrl = baseURL; 
      }else{
        searchUrl = baseURL + '/search?q=' + query;
      }
      setIsLoading(true);
      const response = await fetch(searchUrl);
      let data = await response.json();
      let {books, version} = data;
      console.log("response data ", data);
      if(searchUrl === baseURL) {
        setData(data.books);
      }else {
        setData(data);
      }
      setIsLoading(false);
    }

    const fetchBookTimeout = setTimeout(() => {
      fetchBook();
    }, 2000);

    return () => clearTimeout(fetchBookTimeout);
  }, [query]);

  return { isLoading, data };
}
