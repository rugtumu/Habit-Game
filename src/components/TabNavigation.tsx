'use client';

import { TabType } from '../types/game';

interface TabNavigationProps {
  tabs: TabType[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-shrink-0 px-4 py-3 text-sm font-medium transition-all duration-200
              border-b-2 hover:bg-gray-800
              ${activeTab === tab.id
                ? 'text-blue-400 border-blue-400 bg-gray-800'
                : 'text-gray-400 border-transparent hover:text-gray-300'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 