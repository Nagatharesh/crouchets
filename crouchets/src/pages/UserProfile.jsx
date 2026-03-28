import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

export const UserProfile = () => {
  const { isAuthenticated, user, logout, loginUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true
  });

  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthenticated || user?.role === 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Update user profile (in a real app, this would call an API)
    loginUser(profileForm.email, passwordForm.newPassword || 'password');
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    // In a real app, this would verify current password and update
    setSuccessMessage('Password changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordChange(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    setSuccessMessage('Notification preferences updated!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-4xl font-bold text-dark mb-2">Account Settings</h1>
          <p className="text-mid">Manage your profile and preferences</p>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-teal/10 border border-teal/30 rounded-xl text-teal font-medium"
          >
            ✓ {successMessage}
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-64 shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-warm/50 overflow-hidden sticky top-28">
              {/* User Avatar */}
              <div className="p-6 text-center border-b border-warm/50">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto flex items-center justify-center text-white font-bold text-3xl mb-3">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <p className="font-semibold text-dark">{user?.name}</p>
                <p className="text-sm text-mid">{user?.email}</p>
              </div>
              
              {/* Tabs */}
              <nav className="p-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-dark text-white' 
                        : 'text-mid hover:bg-warm/30 hover:text-dark'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-warm/50 p-6 md:p-8">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="font-playfair text-2xl font-bold text-dark">Profile Information</h2>
                      <p className="text-mid text-sm mt-1">Update your personal details</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                        isEditing 
                          ? 'bg-warm text-dark hover:bg-white' 
                          : 'bg-dark text-white hover:bg-black'
                      }`}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  <form onSubmit={handleProfileSubmit}>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Full Name</label>
                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-xl bg-warm/20 border border-warm/50 text-dark placeholder-slate-400 outline-none focus:border-teal transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
                          <input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-xl bg-warm/20 border border-warm/50 text-dark placeholder-slate-400 outline-none focus:border-teal transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-4"
                        >
                          <button
                            type="submit"
                            className="px-6 py-3 bg-dark text-white rounded-xl font-medium hover:bg-black transition-colors"
                          >
                            Save Changes
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </form>

                  {/* Account Type */}
                  <div className="mt-10 pt-8 border-t border-warm/50">
                    <h3 className="font-semibold text-dark mb-4">Account Type</h3>
                    <div className="flex items-center gap-4 p-4 bg-warm/20 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <span className="text-xl">👑</span>
                      </div>
                      <div>
                        <p className="font-medium text-dark capitalize">{user?.role || 'Customer'}</p>
                        <p className="text-sm text-mid">Full access to all features</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <div className="mb-8">
                    <h2 className="font-playfair text-2xl font-bold text-dark">Security Settings</h2>
                    <p className="text-mid text-sm mt-1">Manage your account security</p>
                  </div>

                  <div className="space-y-6">
                    {/* Password Change */}
                    <div className="p-6 bg-warm/20 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-dark/10 flex items-center justify-center">
                            <span>🔒</span>
                          </div>
                          <div>
                            <p className="font-medium text-dark">Password</p>
                            <p className="text-sm text-mid">Last changed: Never</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowPasswordChange(!showPasswordChange)}
                          className="px-4 py-2 bg-dark text-white rounded-xl font-medium hover:bg-black transition-colors text-sm"
                        >
                          {showPasswordChange ? 'Cancel' : 'Change'}
                        </button>
                      </div>

                      {showPasswordChange && (
                        <motion.form
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          onSubmit={handlePasswordSubmit}
                          className="space-y-4 pt-4 border-t border-warm/50"
                        >
                          <div>
                            <label className="block text-sm font-medium text-dark mb-2">Current Password</label>
                            <input
                              type="password"
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-white border border-warm/50 text-dark outline-none focus:border-teal transition-colors"
                              placeholder="Enter current password"
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-dark mb-2">New Password</label>
                              <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-warm/50 text-dark outline-none focus:border-teal transition-colors"
                                placeholder="Enter new password"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-dark mb-2">Confirm Password</label>
                              <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-warm/50 text-dark outline-none focus:border-teal transition-colors"
                                placeholder="Confirm new password"
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="px-6 py-3 bg-dark text-white rounded-xl font-medium hover:bg-black transition-colors"
                          >
                            Update Password
                          </button>
                        </motion.form>
                      )}
                    </div>

                    {/* Login Activity */}
                    <div className="p-6 bg-warm/20 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <span>📱</span>
                        </div>
                        <div>
                          <p className="font-medium text-dark">Active Sessions</p>
                          <p className="text-sm text-mid">Manage your logged-in devices</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-warm/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                              🖥️
                            </div>
                            <div>
                              <p className="font-medium text-dark">Current Device</p>
                              <p className="text-xs text-mid">Last active: Just now</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-medium rounded-full">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="mb-8">
                    <h2 className="font-playfair text-2xl font-bold text-dark">Notification Preferences</h2>
                    <p className="text-mid text-sm mt-1">Choose what updates you want to receive</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about order status changes, shipping updates, and delivery confirmations', icon: '📦' },
                      { key: 'promotions', label: 'Promotions & Deals', desc: 'Receive notifications about sales, discounts, and special offers', icon: '🏷️' },
                      { key: 'newsletter', label: 'Newsletter', desc: 'Weekly updates about new products and crochet tips', icon: '📧' }
                    ].map(item => (
                      <div key={item.key} className="p-5 bg-warm/20 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl">
                              {item.icon}
                            </div>
                            <div>
                              <p className="font-medium text-dark">{item.label}</p>
                              <p className="text-sm text-mid">{item.desc}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              notifications[item.key] ? 'bg-teal' : 'bg-slate-300'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                                notifications[item.key] ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Logout */}
              <div className="mt-10 pt-8 border-t border-warm/50">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
