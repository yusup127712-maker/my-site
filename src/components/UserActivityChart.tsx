import React from 'react';

const UserActivityChart: React.FC = () => {
  const data = [
    { time: '00:00', users: 12 },
    { time: '04:00', users: 8 },
    { time: '08:00', users: 45 },
    { time: '12:00', users: 67 },
    { time: '16:00', users: 89 },
    { time: '20:00', users: 56 },
    { time: '24:00', users: 34 }
  ];

  const maxUsers = Math.max(...data.map(d => d.users));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">User Activity (24h)</h3>
      
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between space-x-2">
          {data.map((point, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full relative mb-2">
                <div 
                  className="bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                  style={{ 
                    height: `${(point.users / maxUsers) * 200}px`,
                    minHeight: '8px'
                  }}
                >
                </div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                  {point.users}
                </div>
              </div>
              <span className="text-xs text-gray-500">{point.time}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>Peak: {maxUsers} users at 16:00</span>
        <span>Average: {Math.round(data.reduce((sum, d) => sum + d.users, 0) / data.length)} users</span>
      </div>
    </div>
  );
};

export default UserActivityChart;