import { useState, useEffect, useRef } from "react";
import { LineChart, Line, YAxis, ReferenceLine, XAxis } from "recharts";
import axios from "axios";
import UpDownVector from "./ui/UpDownVector";

const BettingTracker = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number>(0);
  const [chartData, setChartData] = useState<Array<{ price: number, time: number }>>([]);
  const [last10BetResult, setLast10BetResult] = useState<Array<'up' | 'down'>>(['up', 'down', 'up', 'down', 'up', 'down', 'up', 'down', 'up', 'down']);
  const [periodStartTime, setPeriodStartTime] = useState<number>(Date.now());
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [remainingTime, setRemainingTime] = useState<number>(30);
  const [cycleStartPrice, setCycleStartPrice] = useState<number>(0);

  useEffect(() => {
    let lastPrice = 0;
    const WINDOW_SIZE = 90; // 90 seconds of data
    
    // Function to fetch Bitcoin price
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const price = parseFloat(response.data.price);
        setBitcoinPrice(price);
        lastPrice = price;
        return price;
      } catch (error) {
        console.error("Error fetching Bitcoin data:", error);
        return lastPrice;
      }
    };

    // Function to start new period
    const startNewPeriod = async () => {
      setPeriodStartTime(Date.now());
      
      // Get current price and set it as cycle start price
      const currentPrice = await fetchBitcoinData();
      setCycleStartPrice(currentPrice);

      // Fetch initial 90 seconds of historical data
      try {
        const response = await axios.get('https://api.binance.com/api/v3/klines', {
          params: {
            symbol: 'BTCUSDT',
            interval: '1s',
            limit: WINDOW_SIZE
          }
        });
        
        const initialData = response.data.map((item: any, index: number) => ({
          price: parseFloat(item[4]), // closing price
          time: index
        }));
        
        setChartData(initialData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setChartData([]);
      }
    };

    // Function to update chart data
    const updateChartData = async () => {
      const currentTime = Date.now();
      const timeElapsed = currentTime - periodStartTime;
      const remaining = Math.max(30 - Math.floor(timeElapsed / 1000), 0);
      setRemainingTime(remaining);
      
      if (timeElapsed <= 30000) {
        const price = await fetchBitcoinData();
        setChartData(prevData => {
          const newData = [
            ...prevData,
            {
              price: price,
              time: timeElapsed / 10000
            }
          ];
          // Keep only the last 30 data points
          return newData.slice(-WINDOW_SIZE);
        });
      } else {
        // When cycle ends, compare final price with starting price
        const finalPrice = await fetchBitcoinData();
        const result: 'up' | 'down' = finalPrice >= cycleStartPrice ? 'up' : 'down';
        
        // Update last10BetResult array
        setLast10BetResult(prev => [...prev.slice(1), result]);
        
        // Start new period
        startNewPeriod();
      }
    };

    // Initial period start
    startNewPeriod();

    // Update chart every second (30 times per period)
    const chartInterval = setInterval(updateChartData, 100);

    // Cleanup
    return () => {
      clearInterval(chartInterval);
    };
  }, [periodStartTime]);

  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        setChartDimensions({
          width: chartContainerRef.current.clientWidth - 32, // Subtract padding (16px * 2)
          height: chartContainerRef.current.clientHeight - 32 // Subtract padding (16px * 2)
        });
      }
    };

    updateDimensions(); // Initial dimensions
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4">
      <div className="flex justify-between gap-4 pb-[5px]">
        <div className="flex flex-col gap-2 items-start">
          <h5 className="text-gray-primary text-2xl font-bold">Bitcoin</h5>
          <p className="text-gray-primary text-lg">{bitcoinPrice.toFixed(2)}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <h5 className="text-gray-primary text-2xl font-bold">{remainingTime}</h5>
          <p className="text-gray-primary text-lg">Place your bets</p>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[330px] bg-card-secondary rounded-2xl p-4">
        <LineChart 
          width={chartDimensions.width} 
          height={chartDimensions.height} 
          data={chartData}
          margin={{ 
            right: 80,
            bottom: 20,
            left: 20,
            top: 20
          }}
        >
          <Line 
           type="monotone" 
           dataKey="price" 
           stroke="#ffffff" 
           dot={false} 
           strokeWidth={2}
         />
          <YAxis domain={['auto', 'auto']} hide />
          <ReferenceLine 
            y={chartData[chartData.length - 1]?.price} 
            stroke="#666666" 
            strokeDasharray="3 3"
            label={{
              value: chartData[chartData.length - 1]?.price?.toFixed(2),
              position: 'right',
              fill: '#666666'
            }}
          />
        </LineChart>
      </div>
      <div className="flex justify-between px-2 py-1">
        {last10BetResult.map((result, index) => (
          <UpDownVector state={result} key={index} />
        ))}
      </div>
    </div>
  )
}

export default BettingTracker