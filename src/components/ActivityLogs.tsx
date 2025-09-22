import React, { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';

const ActivityLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const logs = [
    {
      id: '1',
      timestamp: '2024-01-15 14:32:15',
      user: 'john_doe',
      action: 'LOGIN',
      description: 'User successfully logged in from 192.168.1.100',
      status: 'success',
      location: 'United States'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:30:42',
      user: 'sarah_wilson',
      action: 'CONNECTION_ESTABLISHED',
      description: 'VPN connection established to German server',
      status: 'success',
      location: 'Germany'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:28:19',
      user: 'mike_johnson',
      action: 'LOGIN_FAILED',
      description: 'Failed login attempt - incorrect password',
      status: 'error',
      location: 'Japan'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:25:33',
      user: 'emily_davis',
      action: 'CONNECTION_TERMINATED',
      description: 'VPN connection terminated by user',
      status: 'info',
      location: 'United Kingdom'
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:22:47',
      user: 'alex_brown',
      action: 'DATA_LIMIT_WARNING',
      description: 'User reached 80% of monthly data limit',
      status: 'warning',
      location: 'Singapore'
    },
    {
      id: '6',
      timestamp: '2024-01-15 14:20:15',
      user: 'system',
      action: 'SERVER_MAINTENANCE',
      description: 'Scheduled maintenance completed on US-West server',
      status: 'info',
      location: 'System'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getActionBadge = (action: string) => {
    const styles = {
      LOGIN: 'bg-blue-100 text-blue-800',
      LOGIN_FAILED: 'bg-red-100 text-red-800',
      CONNECTION_ESTABLISHED: 'bg-green-100 text-green-800',
      CONNECTION_TERMINATED: 'bg-orange-100 text-orange-800',
      DATA_LIMIT_WARNING: 'bg-yellow-100 text-yellow-800',
      SERVER_MAINTENANCE: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[action as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {action.replace('_', ' ')}
      </span>
    );
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Logs</h1>
        <p className="text-gray-600">Monitor system activity and user actions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Actions</option>
                <option value="LOGIN">Login</option>
                <option value="LOGIN_FAILED">Login Failed</option>
                <option value="CONNECTION_ESTABLISHED">Connection Established</option>
                <option value="CONNECTION_TERMINATED">Connection Terminated</option>
                <option value="DATA_LIMIT_WARNING">Data Limit Warning</option>
                <option value="SERVER_MAINTENANCE">Server Maintenance</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Date Range</span>
              </button>
              
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{log.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">{log.description}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(log.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredLogs.length} of {logs.length} entries
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;