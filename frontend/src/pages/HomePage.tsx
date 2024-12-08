import React from 'react';
import BettingTracker from '../components/BettingTracker';
import JackPotWonHistory from '../components/JackPotWonHistory';
import BetSection from '../components/BetSection';
import TopUserList from '../components/TopUserList';
import JackPotSection from '../components/JackPotSection';
import ManageWalletDropdown from '../components/ManageWalletDropdown';
import { useModalOpenContext } from '../contexts/ModalOpenContext';

const HomePage: React.FC = () => {
  const { isManageWalletDropdownVisible } = useModalOpenContext();
  return (
    <div className="main w-full flex flex-col gap-1">
      <div className="w-full flex flex-col md:flex-row gap-1">
        <div className="w-[calc(100%-435px)]">
          <BettingTracker />
        </div>
        <div className="w-[431px] flex flex-col gap-1 relative">
          <JackPotWonHistory />
          <BetSection />
          {isManageWalletDropdownVisible && (
            <ManageWalletDropdown />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-1">
        <div className="w-[calc(100%-435px)]">
          <TopUserList />
        </div>
        <div className="w-[431px]">
          <JackPotSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;