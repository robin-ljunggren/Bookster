import { useState, useEffect } from "react";
import memoryService from "../service/memoryService";

export default function useUserSearchApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataState, setDataState] = useState([]);

  useEffect(() => {

    async function fetchUser() {
      
      setIsLoading(true);
      let headersList = {
        "Accept": "*/*",
        "Authorization": "Bearer " + memoryService.getSessionValue('JWT_TOKEN'),
       }

      try {
        
        const response = await fetch("http://127.0.0.1:4000/admin/users", {headers: headersList});
        let data = await response.json();
        let {users, version} = data;
        setDataState(data.users);
        setIsLoading(false);
      }catch(err) {
        console.log(err);
      }
    }

    fetchUser();
    
  }, []);

  return { isLoading, dataState };
}