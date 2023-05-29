import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:4000/admin/users";

export default function useUserSearchApi(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataState, setDataState] = useState([]);
  const [noData, setNoData] = useState(false);

  

  useEffect(() => {

    async function fetchUser() {
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
      fetchUser();
    }, 2000);

    return () => clearTimeout(fetchBookTimeout);
  }, [query]);

  return { isLoading, noData, dataState };
}