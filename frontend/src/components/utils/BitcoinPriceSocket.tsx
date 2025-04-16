// frontend/src/components/utils/BitcoinPriceSocket.tsx
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { usePoolContext } from '../../contexts/PoolContext'; // Import the context

const BitcoinPriceSocket: React.FC<{
  onPricesUpdate: (prices: number[]) => void;
  onRemainingTimeUpdate: (time: number) => void;
  onPeriodResult: (result: Array<'up' | 'down'>) => void;
  setCircleStartPrice: (startPrice: number) => void;
}> = ({ onPricesUpdate, onRemainingTimeUpdate, onPeriodResult, setCircleStartPrice }) => {
  const { upPool, downPool, setJackpotAmount, setDemoUsers, setUpPool, setDownPool, setUpPoolInvestors, setDownPoolInvestors } = usePoolContext(); // Access context values

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL || "http://localhost:5000";
    const socket = io(socketUrl); // Adjust the URL as needed
    console.log(">>> BACKEND_SOCKET_URL : ", socketUrl);

    // Listen for price updates from the server
    socket.on('prices', (prices) => {
      onPricesUpdate(prices); // Pass the price to the parent component
    });

    // Listen for remaining time updates
    socket.on('updateRemainingTime', ({ remainingTime }) => {
      console.log(remainingTime);
      onRemainingTimeUpdate(remainingTime);
    });

    socket.on('betResultStartPrice', ({ betResult, cycleStartPrice }) => {
      console.log(betResult, cycleStartPrice);
      onPeriodResult(betResult);
      setCircleStartPrice(cycleStartPrice);
    });

    // Listen for period result
    socket.on('periodEnded', () => {
      // Calculate the new jackpot amount
      const totalPool = upPool + downPool;
      const additionalJackpot = totalPool * 0.45; // 45% of the sum of up and down pool
      setJackpotAmount(prevJackpot => prevJackpot + additionalJackpot); // Update the jackpot amount

      // Calculate the additional amount to add to the first user's depositedAmount
      const additionalDeposit = totalPool * 0.40; // 40% of the sum of up and down pool
      if (upPool || downPool) {
        // Update the first user in demoUsers
        setDemoUsers(prevUsers => {
          const updatedUsers = [...prevUsers];
          if (updatedUsers.length > 0) {
            const firstUser = updatedUsers[0];

            // Determine the amount to add based on the win streak
            let streakBonus = 0;
            const streak = firstUser.wins; // Assuming wins represent the current streak

            if (streak === 5) {
              streakBonus = additionalJackpot * 0.10; // 10% of the jackpot
            } else if (streak === 6) {
              streakBonus = additionalJackpot * 0.15; // 15% of the jackpot
            } else if (streak === 7) {
              streakBonus = additionalJackpot * 0.20; // 20% of the jackpot
            } else if (streak === 8) {
              streakBonus = additionalJackpot * 0.25; // 25% of the jackpot
            } else if (streak === 9) {
              streakBonus = additionalJackpot * 0.30; // 30% of the jackpot
            } else if (streak === 10) {
              streakBonus = additionalJackpot; // 100% of the remaining jackpot
            }

            // Update the user's deposited amount and adjust the jackpot amount
            updatedUsers[0] = {
              ...firstUser,
              depositedAmount: firstUser.depositedAmount + additionalDeposit + streakBonus, // Update depositedAmount
              bets: firstUser.bets + 1, // Increment bets
              wins: firstUser.wins + 1, // Increment wins
              winRate: (firstUser.wins + 1) / (firstUser.bets + 1), // Update win rate
              topSteak: Math.max(firstUser.topSteak, Math.floor(Math.random() * 10) + 1) // Randomly update top streak
            };

            // Subtract the streak bonus from the jackpot amount
            setJackpotAmount(prevJackpot => prevJackpot - streakBonus);
          }
          return updatedUsers;
        });
      }

      // Clear the pools and investors
      setUpPool(0); // Reset upPool to 0
      setDownPool(0); // Reset downPool to 0
      setUpPoolInvestors([]); // Clear upPoolInvestors
      setDownPoolInvestors([]); // Clear downPoolInvestors
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [onPricesUpdate, onRemainingTimeUpdate, onPeriodResult, upPool, downPool, setJackpotAmount, setDemoUsers, setUpPool, setDownPool, setUpPoolInvestors, setDownPoolInvestors]);

  return null; // This component does not render anything itself
};

export default BitcoinPriceSocket;