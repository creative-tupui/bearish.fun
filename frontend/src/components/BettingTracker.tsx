import { useState,  useRef } from "react";
import { LineChart, Line, YAxis, ReferenceLine } from "recharts";
import UpDownVector from "./ui/UpDownVector";
import BitcoinPriceSocket from "./utils/BitcoinPriceSocket";

const BettingTracker = () => {
  const [chartData, setChartData] = useState<Array<{ price: number, time: number }>>([]);
  const [last10BetResult, setLast10BetResult] = useState<Array<'up' | 'down'>>([]);
  const [remainingTime, setRemainingTime] = useState<number>(30);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [circleStartPrice, setCircleStartPrice] = useState<number>(0);
  // Function to handle price updates from the BitcoinPriceSocket
  const handlePricesUpdate = (prices: number[]) => {
    setChartData(() => {
      const newData = prices.map((price, index) => ({
        price: price,
        time: (index + 1) * 1000
      }));
      return newData
    });
  };

  // Function to handle remaining time updates
  const handleRemainingTimeUpdate = (time: number) => {
    setRemainingTime(time);
  };

  // Function to handle period result updates
  const handlePeriodResult = (result: Array<'up' | 'down'>) => {
     setLast10BetResult(result);
  };
 
  return (
    <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4">
      <BitcoinPriceSocket
        onPricesUpdate={handlePricesUpdate}
        onRemainingTimeUpdate={handleRemainingTimeUpdate}
        onPeriodResult={handlePeriodResult}
        setCircleStartPrice={setCircleStartPrice}
      />
      <div className="flex justify-between gap-4 pb-[5px]">
        <div className="flex flex-col gap-2 items-start">
          <h5 className="text-gray-primary text-2xl font-bold">Bitcoin</h5>
          <p className="text-gray-primary text-lg">{chartData[chartData.length - 1]?.price}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <h5 className="text-gray-primary text-2xl font-bold">{remainingTime}</h5>
          <p className="text-gray-primary text-lg">Place your bets</p>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[330px] bg-card-secondary rounded-2xl p-4">
        <LineChart
          width={chartContainerRef.current?.clientWidth || 300 - 32}
          height={chartContainerRef.current?.clientHeight || 200 - 32}
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
            strokeDasharray="none"
            label={{
              value: chartData[chartData.length - 1]?.price,
              position: 'right',
              fill: '#666666'
            }}
          />
           <ReferenceLine
            y={circleStartPrice}
            stroke="#00ff00"
            strokeDasharray="none"
            label={{
              value: circleStartPrice,
              position: 'right',
              fill: '#00ff00'
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
  );
};

export default BettingTracker;
