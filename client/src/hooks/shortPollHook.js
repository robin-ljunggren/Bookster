import React, { useEffect, useState } from 'react'
import fetchService from '../service/fetchService';

export default function useShortPoll(query, allBooks, setAllBooks) {
  const [timeoutMs, setTimeoutMs] = useState(2000);
  const [missCount, setMissCount] = useState(0);
  const [miss, setMiss] = useState({min: 2, medium: 4, max: 7});
  const [multiplier, setMultiplier] = useState({min: 1200, medium: 1600, max: 2000});
  const [runtime, setRuntime] = useState(0);

  
  async function shortPolling() {
  
    const result = await fetchService.getAllBooks();

    if(allBooks.version === result.version) {

      if(missCount < miss.max) {
        setMissCount(missCount => missCount + 1);
      }
    }else {
      setMissCount(0);
      setAllBooks(result);
    }

    
    if(missCount < miss.min) {
      setTimeoutMs(timeoutMs => timeoutMs + (missCount * multiplier.min)); 
    }else if(missCount > miss.min && missCount < miss.medium) {
      setTimeoutMs(timeoutMs => timeoutMs + (missCount * multiplier.medium))
    }else if(missCount > miss.medium && missCount < miss.max){
      setTimeoutMs(timeoutMs => timeoutMs + (missCount * multiplier.max))
    }
  }


  useEffect(()=> {
      if(query === ''){ 
        let shortPollTimeout = setTimeout(() => {
        shortPolling();
        setRuntime(runtime => runtime + 1);
        console.log(timeoutMs)
      }, timeoutMs);
      return () => clearTimeout(shortPollTimeout);
    }
  },[query, runtime] );

  return { timeoutMs };
}
