import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [userName, setUserName] = useState('John Doe');
    const [userEmail, setUserEmail] = useState('john.doe@example.com');

    // Mock data for user's retirement planning history
    const planningHistory = [
        {
            id: 1,
            date: '2024-01-15',
            title: 'Conservative Retirement Plan',
            monthlyIncome: 75000,
            retirementAge: 60,
            targetCorpus: 50000000,
            status: 'Completed',
            result: 'On Track'
        },
        {
            id: 2,
            date: '2024-01-10',
            title: 'Aggressive Growth Plan',
            monthlyIncome: 80000,
            retirementAge: 55,
            targetCorpus: 75000000,
            status: 'Completed',
            result: 'Needs Adjustment'
        },
        {
            id: 3,
            date: '2024-01-05',
            title: 'Balanced Approach',
            monthlyIncome: 70000,
            retirementAge: 65,
            targetCorpus: 40000000,
            status: 'Completed',
            result: 'Excellent'
        }
    ];

    const recentActivity = [
        {
            id: 1,
            type: 'calculation',
            title: 'Retirement Plan Calculated',
            description: 'Conservative plan with 12% expected returns',
            date: '2 hours ago',
            icon: 'fa-calculator'
        },
        {
            id: 2,
            type: 'update',
            title: 'Profile Updated',
            description: 'Monthly income increased to ₹80,000',
            date: '1 day ago',
            icon: 'fa-user-edit'
        },
        {
            id: 3,
            type: 'result',
            title: 'New Recommendations',
            description: 'AI suggested 3 new investment options',
            date: '3 days ago',
            icon: 'fa-lightbulb'
        }
    ];

    const quickStats = [
        {
            title: 'Total Plans',
            value: '12',
            change: '+2 this month',
            icon: 'fa-chart-line',
            color: 'blue'
        },
        {
            title: 'Avg. Monthly SIP',
            value: '₹25,000',
            change: '+15% from last month',
            icon: 'fa-piggy-bank',
            color: 'green'
        },
        {
            title: 'Target Corpus',
            value: '₹5.2 Cr',
            change: 'On track',
            icon: 'fa-bullseye',
            color: 'purple'
        },
        {
            title: 'Success Rate',
            value: '85%',
            change: '+5% improvement',
            icon: 'fa-trophy',
            color: 'orange'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back, {userName.split(' ')[0]}!
                            </h1>
                            <p className="text-gray-600">Your retirement planning dashboard</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link to="/planning" className="btn btn-primary">
                                <i className="fas fa-plus mr-2"></i>
                                New Plan
                            </Link>
                            <button className="btn btn-outline">
                                <i className="fas fa-download mr-2"></i>
                                Export Data
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="card">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-green-600">{stat.change}</p>
                                    </div>
                                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                                        <i className={`fas ${stat.icon} text-${stat.color}-600 text-xl`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                        {[
                            { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
                            { id: 'history', label: 'Planning History', icon: 'fa-history' },
                            { id: 'activity', label: 'Recent Activity', icon: 'fa-clock' },
                            { id: 'profile', label: 'Profile', icon: 'fa-user' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <i className={`fas ${tab.icon} mr-2`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Current Plan Summary */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900">Current Retirement Plan</h3>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Target Corpus</span>
                                        <span className="font-semibold text-gray-900">₹5.2 Cr</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Monthly SIP</span>
                                        <span className="font-semibold text-gray-900">₹25,000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Retirement Age</span>
                                        <span className="font-semibold text-gray-900">60 years</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-semibold text-green-600">On Track</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Investment Allocation */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900">Investment Allocation</h3>
                            </div>
                            <div className="card-body">
                                <div className="space-y-3">
                                    {[
                                        { name: 'Equity Funds', percentage: 60, color: 'blue' },
                                        { name: 'Debt Funds', percentage: 25, color: 'green' },
                                        { name: 'PPF/EPF', percentage: 10, color: 'purple' },
                                        { name: 'Gold', percentage: 5, color: 'yellow' }
                                    ].map((item, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">{item.name}</span>
                                                <span className="font-medium text-gray-900">{item.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`bg-${item.color}-600 h-2 rounded-full`}
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-lg font-semibold text-gray-900">Planning History</h3>
                        </div>
                        <div className="card-body">
                            <div className="space-y-4">
                                {planningHistory.map((plan) => (
                                    <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{plan.title}</h4>
                                                <p className="text-sm text-gray-600">Created on {plan.date}</p>
                                                <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                                    <span>Income: ₹{plan.monthlyIncome.toLocaleString()}</span>
                                                    <span>Retirement: {plan.retirementAge} years</span>
                                                    <span>Target: ₹{(plan.targetCorpus / 10000000).toFixed(1)} Cr</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${plan.result === 'Excellent' ? 'bg-green-100 text-green-800' :
                                                    plan.result === 'On Track' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {plan.result}
                                                </span>
                                                <div className="mt-2">
                                                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="card-body">
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className={`fas ${activity.icon} text-primary-600`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{activity.title}</h4>
                                            <p className="text-sm text-gray-600">{activity.description}</p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* User Profile */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                            </div>
                            <div className="card-body">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-user text-primary-600 text-2xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{userName}</h4>
                                        <p className="text-gray-600">{userEmail}</p>
                                        <p className="text-sm text-gray-500">Member since {new Date().getFullYear()}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email Verified</span>
                                        <span className="text-green-600 font-medium">✓ Verified</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Account Status</span>
                                        <span className="text-green-600 font-medium">Active</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Last Login</span>
                                        <span className="text-gray-900">Today</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Personal Information</h4>
                                                <p className="text-sm text-gray-600">Update your profile details</p>
                                            </div>
                                            <i className="fas fa-chevron-right text-gray-400"></i>
                                        </div>
                                    </button>
                                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Security Settings</h4>
                                                <p className="text-sm text-gray-600">Change password and security</p>
                                            </div>
                                            <i className="fas fa-chevron-right text-gray-400"></i>
                                        </div>
                                    </button>
                                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Notifications</h4>
                                                <p className="text-sm text-gray-600">Manage your notification preferences</p>
                                            </div>
                                            <i className="fas fa-chevron-right text-gray-400"></i>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;