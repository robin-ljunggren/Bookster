import {useState, useEffect} from 'react';

const baseURL = "http://127.0.0.1:4000/library";

export default function useUserSearchApi(query) {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  let userUrl = baseURL + "/books/seach?q=";

  async function fetchUser() {
    if(query === '') return false;
    setIsLoading(true);
    const response = await fetch(baseURL + userUrl + query);
    setData(await response.json());
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchUserTimeout = setTimeout(() => {fetchUser()}, 2000);

    return () => clearTimeout(fetchUserTimeout);
  }, [query]);

 
  return {isLoading, data};
}