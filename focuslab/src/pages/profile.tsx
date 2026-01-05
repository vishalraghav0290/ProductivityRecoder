import React, { useState } from 'react';
import { BarChart3, CheckCircle, Flame, Clock, AlertTriangle, Target, CreditCard, Lock, Key, LogOut, AlertCircle, Trash2 } from 'lucide-react';

export default function ProfilePage() {
  // Dummy data - replace with API calls later
  const [profileData] = useState({
    user: {
      name: "Vishal Raghav",
      email: "vishal@gmail.com",
      joinedDate: "Dec 2024",
      isPro: true,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    progress: {
      habitConsistency: 68,
      strongestHabit: "Study",
      avgFocusTime: 3.4,
      needsImprovement: ["Social Media Detox"]
    },
    goals: {
      dailyFocusGoal: 6,
      bestWorkingTime: "Morning",
      primaryGoal: "Productivity"
    },
    subscription: {
      plan: "Pro",
      billingCycle: "Monthly",
      renewsOn: "12 Jan 2025",
      startDate: "(Date)"
    }
  });

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // API call here
  };

  const handleViewAnalytics = () => {
    console.log('View analytics clicked');
    // API call here
  };

  const handleEditGoals = () => {
    console.log('Edit goals clicked');
    // API call here
  };

  const handleViewPayments = () => {
    console.log('View payments clicked');
    // API call here
  };

  const handleUpgradeCancel = () => {
    console.log('Upgrade/Cancel clicked');
    // API call here
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
    // API call here
  };

  const handleLogoutAll = () => {
    console.log('Logout from all devices clicked');
    // API call here
  };

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
    // API call here
  };

  return (
    <div className="max-h-screen bg-gray-100 py-8 px-4  ">
     <div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-3 mb-3 flex max-h-[10%]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={profileData.user.avatarUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {profileData.user.name}
                </h2>
                <p className="text-gray-600 mb-2">{profileData.user.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-gray-500">Joined: {profileData.user.joinedDate}</span>
                  {profileData.user.isPro && (
                    <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full">Pro</span>
                  )}
                </div>
              </div>
            </div>
            <button 
              onClick={handleEditProfile}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Your Overall Progress */}
        <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl shadow-sm p-3 mb-3">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="text-gray-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Your Overall Progress</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Card */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={22} />
                  <span className="text-gray-700">
                    Habit consistency: <span className="font-bold">{profileData.progress.habitConsistency}%</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Flame className="text-orange-500 flex-shrink-0" size={22} />
                  <span className="text-gray-700">
                    Strongest habit: <span className="font-bold">{profileData.progress.strongestHabit}</span>
                  </span>
                </div>
                <button 
                  onClick={handleViewAnalytics}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors w-full mt-2"
                >
                  View Analytics
                </button>
              </div>
            </div>

            {/* Middle Card */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-500 flex-shrink-0" size={22} />
                  <span className="text-gray-700">
                    Avg focus time: <span className="font-bold">{profileData.progress.avgFocusTime} hrs/day</span>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={22} />
                  <span className="text-gray-700">Needs improvement:</span>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={22} />
                <div>
                  <span className="text-gray-700 block mb-1">Needs improvement:</span>
                  {profileData.progress.needsImprovement.map((item, index) => (
                    <span key={index} className="text-gray-900 font-semibold block">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: 3 Column Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-6">
          {/* Goals & Preferences */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target className="text-gray-600" size={22} />
              <h3 className="text-lg font-bold text-gray-900">Goals & Preferences</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gray-700 block">
                    Daily focus goal: <span className="font-semibold">{profileData.goals.dailyFocusGoal} hours</span>
                  </span>
                </div>
                <button 
                  onClick={handleEditGoals}
                  className="text-gray-500 hover:text-gray-600 font-medium text-sm"
                >
                  Edit
                </button>
              </div>
              <p className="text-gray-700">
                Best working time: <span className="font-semibold">{profileData.goals.bestWorkingTime}</span>
              </p>
              <p className="text-gray-700">
                Primary goal: <span className="font-semibold">{profileData.goals.primaryGoal}</span>
              </p>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-white rounded-xl shadow-sm px-6 py-6">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="text-gray-600" size={22} />
              <h3 className="text-lg font-bold text-gray-900">Subscription & Billing</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Plan: <span className="font-semibold">{profileData.subscription.plan} ({profileData.subscription.billingCycle})</span>
              </p>
              <p className="text-gray-700">
                Renews on: <span className="font-semibold">{profileData.subscription.renewsOn}</span>
              </p>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleViewPayments}
                  className="text-gray-700 hover:text-gray-600 font-medium text-sm"
                >
                  View Payments
                </button>
                <button 
                  onClick={handleUpgradeCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Upgrade / Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lock className="text-gray-600" size={22} />
              <h3 className="text-lg font-bold text-gray-900">Security</h3>
            </div>
            <div className="space-y-3">
              <button 
                onClick={handleChangePassword}
                className="flex items-center gap-3 text-gray-700 hover:text-gray-600 transition-colors w-full text-left"
              >
                <Key size={20} className="flex-shrink-0" />
                <span>Change Password</span>
              </button>
              <button 
                onClick={handleLogoutAll}
                className="flex items-center gap-3 text-gray-700 hover:text-gray-600 transition-colors w-full text-left"
              >
                <LogOut size={20} className="flex-shrink-0" />
                <span>Logout from all devices</span>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-red-500" size={22} />
                <h4 className="text-lg font-bold text-red-600">Danger Zone</h4>
              </div>
              <button 
                onClick={handleDeleteAccount}
                className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors w-full text-left"
              >
                <Trash2 size={20} className="flex-shrink-0" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked Layout */}
        <div className="md:hidden space-y-4">
          {/* Goals & Preferences */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-gray-600" size={20} />
              <h3 className="text-base font-bold text-gray-900">Goals & Preferences</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-gray-700 text-sm">
                  Daily focus goal: <span className="font-semibold">{profileData.goals.dailyFocusGoal} hours</span>
                </span>
                <button 
                  onClick={handleEditGoals}
                  className="text-gray-500 hover:text-gray-600 font-medium text-sm"
                >
                  Edit
                </button>
              </div>
              <p className="text-gray-700 text-sm">
                Best working time: <span className="font-semibold">{profileData.goals.bestWorkingTime}</span>
              </p>
              <p className="text-gray-700 text-sm">
                Primary goal: <span className="font-semibold">{profileData.goals.primaryGoal}</span>
              </p>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-gray-600" size={20} />
              <h3 className="text-base font-bold text-gray-900">Subscription & Billing</h3>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm">
                Plan: <span className="font-semibold">{profileData.subscription.plan} ({profileData.subscription.billingCycle})</span>
              </p>
              <p className="text-gray-700 text-sm">
                Renews on: <span className="font-semibold">{profileData.subscription.renewsOn}</span>
              </p>
              <div className="flex gap-2 pt-1">
                <button 
                  onClick={handleViewPayments}
                  className="text-gray-700 hover:text-gray-600 font-medium text-sm"
                >
                  View Payments
                </button>
                <button 
                  onClick={handleUpgradeCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Upgrade / Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="text-gray-600" size={20} />
              <h3 className="text-base font-bold text-gray-900">Security</h3>
            </div>
            <div className="space-y-3">
              <button 
                onClick={handleChangePassword}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-600 transition-colors w-full text-left text-sm"
              >
                <Key size={18} />
                <span>Change Password</span>
              </button>
              <button 
                onClick={handleLogoutAll}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-600 transition-colors w-full text-left text-sm"
              >
                <LogOut size={18} />
                <span>Logout from all devices</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="text-red-500" size={20} />
              <h3 className="text-base font-bold text-red-600">Danger Zone</h3>
            </div>
            <button 
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors w-full text-left text-sm"
            >
              <Trash2 size={18} />
              <span>Delete Account</span>
            </button>
          </div>

          {/* Second Subscription & Billing */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-gray-600" size={20} />
              <h3 className="text-base font-bold text-gray-900">Subscription & Billing</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-lg">✏️</span>
                <p className="text-gray-700 text-sm">
                  Plan: <span className="font-semibold">{profileData.subscription.plan} ({profileData.subscription.billingCycle})</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-lg">🔄</span>
                <p className="text-gray-700 text-sm">
                  StartDate <span className="text-gray-400">{profileData.subscription.startDate}</span>
                </p>
              </div>
              <div className="flex gap-2 pt-1">
                <button 
                  onClick={handleViewPayments}
                  className="text-gray-700 hover:text-gray-600 font-medium text-sm"
                >
                  View Payments
                </button>
                <button 
                  onClick={handleUpgradeCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Upgrade / Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Second Security */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="text-gray-600" size={20} />
              <h3 className="text-base font-bold text-gray-900">Security</h3>
            </div>
            <div className="space-y-3">
              <button 
                onClick={handleChangePassword}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-600 transition-colors w-full text-left text-sm"
              >
                <Lock size={18} />
                <span>Change Password</span>
              </button>
              <button 
                onClick={handleLogoutAll}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-600 transition-colors w-full text-left text-sm"
              >
                <LogOut size={18} />
                <span>Logout from all devices</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}