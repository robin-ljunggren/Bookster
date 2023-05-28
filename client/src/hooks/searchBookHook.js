import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:4000/library/books";

export default function useBookSearchApi(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataState, setDataState] = useState([]);
  const [noData, setNoData] = useState(false);

  

  useEffect(() => {

    async function fetchBook() {
      let searchUrl;
      if(query === undefined || query === '') {
        searchUrl = baseURL; 
      }else{
        searchUrl = baseURL + '/search?q=' + query;
      }
      setIsLoading(true);
      
      try {
        setNoData(false)
        const response = await fetch(searchUrl);
        let data = await response.json();
        let {books, version} = data;
        console.log("D = ",data, "D.b = ",data.books);
        if(data.length === 0 && data.books === undefined) {
          setNoData(true);
        }else {

        if(searchUrl === baseURL) {
          setDataState(data.books);
        }else {
          setDataState(data);
        }
        setIsLoading(false);
        }
      }catch(err) {
        console.log(err);
      }
    }

    const fetchBookTimeout = setTimeout(() => {
      fetchBook();
    }, 2000);

    return () => clearTimeout(fetchBookTimeout);
  }, [query]);

  return { isLoading, noData, dataState };
}
