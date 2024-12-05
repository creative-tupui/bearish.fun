import React from 'react';
import BettingTracker from '../components/BettingTracker';
import JackPotWonHistory from '../components/JackPotWonHistory';
import BetSection from '../components/BetSection';
import TopUserList from '../components/TopUserList';

const HomePage: React.FC = () => {
  return (
    <div className="main w-full flex flex-col gap-1">
      <div className="w-full flex flex-col md:flex-row gap-1">
        <div className="w-[calc(100%-431px)]">
          <BettingTracker />
        </div>
        <div className="w-[431px] flex flex-col gap-1">
          <JackPotWonHistory />
          <BetSection />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-1">
        <div className="w-[calc(100%-431px)]">
          <TopUserList />
        </div>
        <div className="w-[431px]">
          <div className="bg-card-primary rounded-lg p-4 flex flex-col gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;