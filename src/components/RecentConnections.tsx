import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const RecentConnections: React.FC = () => {
  const connections = [
    {
      user: 'john_doe',
      action: 'connected',
      time: '2 minutes ago',
      location: 'United States'
    },
    {
      user: 'sarah_wilson',
      action: 'disconnected',
      time: '5 minutes ago',
      location: 'Germany'
    },
    {
      user: 'mike_johnson',
      action: 'connected',
      time: '12 minutes ago',
      location: 'Japan'
    },
    {
      user: 'emily_davis',
      action: 'connected',
      time: '18 minutes ago',
      location: 'United Kingdom'
    },
    {
      user: 'alex_brown',
      action: 'disconnected',
      time: '25 minutes ago',
      location: 'Singapore'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Connections</h3>
      
      <div className="space-y-4">
        {connections.map((connection, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-2 rounded-lg ${
              connection.action === 'connected' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {connection.action === 'connected' ? (
                <Wifi className="w-4 h-4" />
              ) : (
                <WifiOff className="w-4 h-4" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {connection.user}
              </p>
              <p className="text-xs text-gray-500">
                {connection.action} • {connection.location}
              </p>
            </div>
            
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {connection.time}
            </span>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        View All Activity
      </button>
    </div>
  );
};

export default RecentConnections;