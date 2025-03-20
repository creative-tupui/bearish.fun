import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const BitcoinPriceSocket: React.FC<{ onPricesUpdate: (prices: number[]) => void, onRemainingTimeUpdate: (time: number) => void, onPeriodResult: (result: Array<'up' | 'down'>) => void, setCircleStartPrice:(startPrice:number)=>void }> = ({ onPricesUpdate, onRemainingTimeUpdate, onPeriodResult,setCircleStartPrice }) => {
  useEffect(() => {
    const socket = io('http://localhost:5000'); // Adjust the URL as needed

    // Listen for price updates from the server
    socket.on('prices', (prices) => {
      // console.log('Current Bitcoin Prices:', prices);
      onPricesUpdate(prices); // Pass the price to the parent component
    });
    
    // Listen for remaining time updates
    socket.on('updateRemainingTime', ({ remainingTime }) => {
      // console.log(remainingTime);
      
      onRemainingTimeUpdate(remainingTime);
    });

    // Listen for period result
    socket.on('betResultStartPrice', ({betResult, cycleStartPrice}) => {
      console.log(betResult,cycleStartPrice);
      onPeriodResult(betResult);
      setCircleStartPrice(cycleStartPrice);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [onPricesUpdate, onRemainingTimeUpdate, onPeriodResult]);

  return null; // This component does not render anything itself
};

export default BitcoinPriceSocket; 