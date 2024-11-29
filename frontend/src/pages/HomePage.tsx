import React from 'react';
import BettingTracker from '../components/BettingTracker';

const HomePage: React.FC = () => {
  return (
    <div className="main w-full flex flex-col gap-1">
      <div className="w-full flex flex-col md:flex-row gap-1">
        <div className="flex-1">
          <BettingTracker />
        </div>
        <div className="w-[431px]">
          <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4"></div>
          <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4"></div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-1">
        <div className="flex flex-col gap-1">
          <div className="bg-card-secondary rounded-lg p-4 flex items-center"></div>
        </div>
        <div className="">
          <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;