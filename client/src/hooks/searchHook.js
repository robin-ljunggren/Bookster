import {useState, useEffect} from 'react';

const baseURL = "http://127.0.0.1:4000/library/books/search?q=";

export default function useSearchApi(query) {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  async function fetchBook() {
    if(query === '') return false;
    setIsLoading(true);
    const response = await fetch(baseURL + query);
    setData(await response.json()); 
    

    setIsLoading(false);
  }
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {fetchBook()}, 2000);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {isLoading, data};
}


