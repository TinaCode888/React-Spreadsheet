import { useState } from 'react';

const tabs = ['All Orders', 'Pending', 'Reviewed', 'Arrived'];

function BottomTabs() {
  const [activeTab, setActiveTab] = useState('All Orders');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    console.log(`${tab} clicked`);
  };

  return (
    <div className="flex items-center border-t px-2 sm:px-8 bg-gray-50 text-[#757575]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 text-sm mr-2 border ${
            activeTab === tab
              ? 'bg-[#E8F0E9] border-0 border-t-2 border-[#4B6A4F] font-medium text-[#3E5741]'
              : 'bg-transparent border-transparent'
          }`}
        >
          {tab}
        </button>
      ))}

      <button
        title="Add new tab"
        onClick={() => console.log('Add new tab clicked')}
        className="text-xl font-bold hover:text-gray-700"
      >
        +
      </button>
    </div>
  );
}

export default BottomTabs;
