// components/Tabs.tsx
import React, { useState } from 'react';
import { TabProps, TabsProps } from './props';



const Tab: React.FC<TabProps> = ({ label, index, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 focus:outline-none text-xl text-gray-700 ${isActive ? ' bg-white rounded-md' : 'text-gray-600'}`}
      onClick={() => onClick(index)}
    >
      {label}
    </button>
  );
};



const Tabs: React.FC<TabsProps> = ({ labels, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex justify-center bg-gray-200 p-1 mt-5 rounded-md border-b">
        {labels.map((label, index) => (
          <Tab key={index} label={label} index={index} isActive={index === activeTab} onClick={handleTabClick} />
        ))}
      </div>
      <div className="mt-4">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;
