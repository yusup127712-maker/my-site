import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Settings as SettingsIcon,
  Shield,
  Wifi
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">VPN Control</h1>
            <p className="text-slate-400 text-sm">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Server Status</p>
            <p className="text-xs text-slate-400">Online - 99.9% uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;