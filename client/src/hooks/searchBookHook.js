import {useState, useEffect} from 'react';

const baseURL = "http://127.0.0.1:4000/library";

export default function useBookSearchApi(query) {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  let booksUrl = baseURL + "/books/search?q=";
  

  async function fetchBook() {
    if(query === '') return false;
    setIsLoading(true);
    const response = await fetch(baseURL + booksUrl + query);
    setData(await response.json()); 
    setIsLoading(false);
  }

  
  
  useEffect(() => {
    const fetchBookTimeout = setTimeout(() => {fetchBook()}, 2000);

    return () => clearTimeout(fetchBookTimeout);
  }, [query]);

 

  return {isLoading, data};
}


