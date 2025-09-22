import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield,
  ShieldOff,
  Download
} from 'lucide-react';
import UserModal from './UserModal';

interface User {
  id: string;
  username: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  dataUsed: string;
  connectionTime: string;
  ipAddress: string;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const mockUsers: User[] = [
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      status: 'active',
      lastLogin: '2 hours ago',
      dataUsed: '1.2 GB',
      connectionTime: '4h 32m',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      username: 'sarah_wilson',
      email: 'sarah@example.com',
      status: 'active',
      lastLogin: '5 minutes ago',
      dataUsed: '847 MB',
      connectionTime: '2h 15m',
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      username: 'mike_johnson',
      email: 'mike@example.com',
      status: 'inactive',
      lastLogin: '2 days ago',
      dataUsed: '2.8 GB',
      connectionTime: '0m',
      ipAddress: '-'
    },
    {
      id: '4',
      username: 'emily_davis',
      email: 'emily@example.com',
      status: 'suspended',
      lastLogin: '1 week ago',
      dataUsed: '156 MB',
      connectionTime: '0m',
      ipAddress: '-'
    }
  ];

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === mockUsers.length 
        ? [] 
        : mockUsers.map(user => user.id)
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage VPN users, monitor connections, and control access</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              <button 
                onClick={() => setShowUserModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-800">
                  {selectedUsers.length} user(s) selected
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Activate</span>
                  </button>
                  <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors flex items-center space-x-1">
                    <ShieldOff className="w-3 h-3" />
                    <span>Suspend</span>
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors flex items-center space-x-1">
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === mockUsers.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.username}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.dataUsed}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.connectionTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.ipAddress}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          setEditingUser(user);
                          setShowUserModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredUsers.length} of {mockUsers.length} users
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

      {showUserModal && (
        <UserModal
          user={editingUser}
          onClose={() => {
            setShowUserModal(false);
            setEditingUser(null);
          }}
          onSave={(userData) => {
            console.log('Save user:', userData);
            setShowUserModal(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;