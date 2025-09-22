import React, { useState } from 'react';
import { 
  Save, 
  Server, 
  Shield, 
  Bell, 
  Globe,
  Key,
  Database,
  AlertCircle
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('server');
  
  const [serverSettings, setServerSettings] = useState({
    maxConnections: '1000',
    connectionTimeout: '300',
    dataTransferLimit: '1000',
    logRetention: '30'
  });

  const [securitySettings, setSecuritySettings] = useState({
    encryptionProtocol: 'AES-256',
    authenticationMethod: 'certificate',
    twoFactorAuth: true,
    passwordComplexity: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    slackWebhook: '',
    alertThreshold: '80',
    maintenanceNotices: true
  });

  const tabs = [
    { id: 'server', label: 'Server Configuration', icon: Server },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'network', label: 'Network', icon: Globe }
  ];

  const handleServerChange = (field: string, value: string) => {
    setServerSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: string | boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const renderServerSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Concurrent Connections
          </label>
          <input
            type="number"
            value={serverSettings.maxConnections}
            onChange={(e) => handleServerChange('maxConnections', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Maximum number of simultaneous connections</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Connection Timeout (seconds)
          </label>
          <input
            type="number"
            value={serverSettings.connectionTimeout}
            onChange={(e) => handleServerChange('connectionTimeout', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Idle connection timeout</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Transfer Limit (GB/month)
          </label>
          <input
            type="number"
            value={serverSettings.dataTransferLimit}
            onChange={(e) => handleServerChange('dataTransferLimit', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Monthly data transfer limit per server</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Log Retention (days)
          </label>
          <input
            type="number"
            value={serverSettings.logRetention}
            onChange={(e) => handleServerChange('logRetention', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">How long to keep activity logs</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Configuration Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Changes to server settings will require a server restart and may temporarily disconnect active users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Encryption Protocol
          </label>
          <select
            value={securitySettings.encryptionProtocol}
            onChange={(e) => handleSecurityChange('encryptionProtocol', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="AES-256">AES-256</option>
            <option value="AES-128">AES-128</option>
            <option value="ChaCha20">ChaCha20</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Authentication Method
          </label>
          <select
            value={securitySettings.authenticationMethod}
            onChange={(e) => handleSecurityChange('authenticationMethod', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="certificate">Certificate-based</option>
            <option value="password">Username/Password</option>
            <option value="hybrid">Hybrid (Certificate + Password)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600">Require 2FA for admin access</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorAuth}
              onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Password Complexity Requirements</h4>
            <p className="text-sm text-gray-600">Enforce strong password policies</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.passwordComplexity}
              onChange={(e) => handleSecurityChange('passwordComplexity', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Key className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Security Recommendation</h4>
            <p className="text-sm text-blue-700 mt-1">
              We recommend using certificate-based authentication with 2FA enabled for maximum security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Email Alerts</h4>
            <p className="text-sm text-gray-600">Receive email notifications for critical events</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.emailAlerts}
              onChange={(e) => handleNotificationChange('emailAlerts', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Maintenance Notices</h4>
            <p className="text-sm text-gray-600">Notify users about scheduled maintenance</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.maintenanceNotices}
              onChange={(e) => handleNotificationChange('maintenanceNotices', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slack Webhook URL
          </label>
          <input
            type="url"
            value={notificationSettings.slackWebhook}
            onChange={(e) => handleNotificationChange('slackWebhook', e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Optional: Send alerts to Slack channel</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alert Threshold (%)
          </label>
          <input
            type="number"
            min="50"
            max="95"
            value={notificationSettings.alertThreshold}
            onChange={(e) => handleNotificationChange('alertThreshold', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Server load percentage to trigger alerts</p>
        </div>
      </div>
    </div>
  );

  const renderNetworkSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Network Configuration</span>
        </h4>
        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Primary DNS Server:</span>
            <span className="font-mono">8.8.8.8</span>
          </div>
          <div className="flex justify-between">
            <span>Secondary DNS Server:</span>
            <span className="font-mono">1.1.1.1</span>
          </div>
          <div className="flex justify-between">
            <span>VPN Subnet:</span>
            <span className="font-mono">10.0.0.0/24</span>
          </div>
          <div className="flex justify-between">
            <span>Port Range:</span>
            <span className="font-mono">1194-1204</span>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Advanced Configuration</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Network settings are managed through the server configuration file. Contact your system administrator for changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'server':
        return renderServerSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'network':
        return renderNetworkSettings();
      default:
        return renderServerSettings();
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your VPN server and admin panel settings</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {renderContent()}
          
          <div className="flex items-center justify-end pt-6 mt-6 border-t border-gray-200">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;