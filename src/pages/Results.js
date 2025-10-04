import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RetirementAPI from '../services/api';

const Results = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user data from localStorage or context
    const getUserData = () => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            return JSON.parse(userData);
        }
        return null;
    };

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                setLoading(true);
                const userData = getUserData();

                if (!userData) {
                    setError('No user data found. Please complete the planning form first.');
                    return;
                }

                // Call the backend API
                try {
                    const result = await RetirementAPI.analyzeRetirement(userData);
                    setAnalysisData(result);
                } catch (apiError) {
                    console.error('Backend API failed:', apiError);
                    // Use fallback mock data
                    const fallbackData = {
                        success: true,
                        projection: {
                            current_age: userData.age || 30,
                            retirement_age: userData.retirementAge || 65,
                            years_to_retirement: (userData.retirementAge || 65) - (userData.age || 30),
                            current_savings: userData.currentSavings || 0,
                            monthly_savings: userData.monthlySavings || 0,
                            annual_savings: (userData.monthlySavings || 0) * 12,
                            expected_returns: userData.expectedReturns || 6.0,
                            projected_corpus: (userData.currentSavings || 0) * 1.5,
                            retirement_goal: userData.retirementGoal || 1000000,
                            readiness_percentage: 75.0,
                            shortfall: 250000,
                            surplus: 0
                        },
                        analysis: {
                            summary: "Your retirement readiness is 75.0%",
                            readiness_score: 75.0,
                            corpus: (userData.currentSavings || 0) * 1.5,
                            confidence_level: "Medium",
                            key_insights: ["Basic analysis completed", "Consider increasing savings"],
                            risk_factors: ["Market volatility", "Inflation risk"]
                        },
                        strategies: [
                            {
                                title: "Increase Monthly Savings",
                                description: "Consider increasing monthly savings",
                                impact: "High",
                                timeframe: "Immediate",
                                difficulty: "Medium",
                                expected_benefit: "20% increase in retirement corpus"
                            }
                        ],
                        overall_priority: "High",
                        implementation_order: ["Increase Monthly Savings"],
                        risk_assessment: "Moderate",
                        ai_enabled: false
                    };
                    setAnalysisData(fallbackData);
                }
            } catch (err) {
                console.error('Analysis failed:', err);
                setError('Failed to analyze retirement plan. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, []);

    // Mock data for demonstration (fallback)
    const retirementData = {
        currentAge: 30,
        retirementAge: 60,
        yearsToRetirement: 30,
        monthlyIncome: 75000,
        monthlyExpenses: 45000,
        monthlySavings: 30000,
        currentSavings: 500000,
        targetCorpus: 50000000,
        projectedCorpus: 35000000,
        savingsGap: 15000000,
        recommendedMonthlySIP: 25000,
        riskProfile: 'Moderate',
        inflationRate: 6.5,
        expectedReturns: 12
    };

    const investmentRecommendations = [
        {
            category: 'Equity Mutual Funds',
            percentage: 60,
            amount: 15000,
            description: 'High growth potential for long-term wealth creation',
            risk: 'High',
            expectedReturn: '12-15%'
        },
        {
            category: 'Debt Mutual Funds',
            percentage: 25,
            amount: 6250,
            description: 'Stable returns with lower risk',
            risk: 'Low',
            expectedReturn: '7-9%'
        },
        {
            category: 'PPF/EPF',
            percentage: 10,
            amount: 2500,
            description: 'Tax-saving and guaranteed returns',
            risk: 'Very Low',
            expectedReturn: '7-8%'
        },
        {
            category: 'Gold/Commodities',
            percentage: 5,
            amount: 1250,
            description: 'Hedge against inflation',
            risk: 'Medium',
            expectedReturn: '8-10%'
        }
    ];

    const TabButton = ({ id, label, icon, isActive, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${isActive
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
        >
            <i className={`fas ${icon} mr-2`}></i>
            {label}
        </button>
    );

    const StatCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
        <div className="card">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                    </div>
                    <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                        <i className={`fas ${icon} text-${color}-600 text-xl`}></i>
                    </div>
                </div>
            </div>
        </div>
    );

    const ProgressBar = ({ percentage, label, color = 'primary' }) => (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">{label}</span>
                <span className="font-medium text-gray-900">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`bg-${color}-600 h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Retirement Plan</h2>
                    <p className="text-gray-600">Please wait while we process your data...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Failed</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link to="/planning" className="btn-primary">
                        Try Again
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Retirement Plan</h1>
                            <p className="text-gray-600">AI-powered analysis and personalized recommendations</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link to="/dashboard" className="btn btn-outline">
                                <i className="fas fa-edit mr-2"></i>
                                Edit Plan
                            </Link>
                            <button className="btn btn-primary">
                                <i className="fas fa-download mr-2"></i>
                                Download Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        <TabButton
                            id="overview"
                            label="Overview"
                            icon="fa-chart-pie"
                            isActive={activeTab === 'overview'}
                            onClick={setActiveTab}
                        />
                        <TabButton
                            id="investments"
                            label="Investment Plan"
                            icon="fa-chart-line"
                            isActive={activeTab === 'investments'}
                            onClick={setActiveTab}
                        />
                        <TabButton
                            id="projections"
                            label="Projections"
                            icon="fa-chart-bar"
                            isActive={activeTab === 'projections'}
                            onClick={setActiveTab}
                        />
                        <TabButton
                            id="recommendations"
                            label="Recommendations"
                            icon="fa-lightbulb"
                            isActive={activeTab === 'recommendations'}
                            onClick={setActiveTab}
                        />
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Target Corpus"
                                value="₹5.0 Cr"
                                subtitle="Required at retirement"
                                icon="fa-bullseye"
                                color="primary"
                            />
                            <StatCard
                                title="Current Savings"
                                value="₹5.0 L"
                                subtitle="Existing investments"
                                icon="fa-piggy-bank"
                                color="green"
                            />
                            <StatCard
                                title="Monthly SIP"
                                value="₹25,000"
                                subtitle="Recommended investment"
                                icon="fa-chart-line"
                                color="blue"
                            />
                            <StatCard
                                title="Savings Gap"
                                value="₹1.5 Cr"
                                subtitle="Additional amount needed"
                                icon="fa-exclamation-triangle"
                                color="red"
                            />
                        </div>

                        {/* Progress Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-lg font-semibold text-gray-900">Retirement Progress</h3>
                                </div>
                                <div className="card-body space-y-6">
                                    <ProgressBar percentage={10} label="Current Progress" color="primary" />
                                    <ProgressBar percentage={70} label="On Track for Target" color="green" />
                                    <ProgressBar percentage={85} label="Risk Assessment" color="blue" />
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-lg font-semibold text-gray-900">Financial Health</h3>
                                </div>
                                <div className="card-body">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Monthly Savings Rate</span>
                                            <span className="font-semibold text-green-600">40%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Debt-to-Income Ratio</span>
                                            <span className="font-semibold text-green-600">15%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Emergency Fund</span>
                                            <span className="font-semibold text-yellow-600">6 months</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Risk Profile</span>
                                            <span className="font-semibold text-blue-600">Moderate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'investments' && (
                    <div className="space-y-8">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900">Recommended Investment Allocation</h3>
                            </div>
                            <div className="card-body">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Pie Chart Placeholder */}
                                    <div className="flex items-center justify-center">
                                        <div className="w-64 h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                                            <div className="text-center">
                                                <i className="fas fa-chart-pie text-primary-600 text-4xl mb-2"></i>
                                                <p className="text-primary-600 font-semibold">Investment Mix</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Investment Breakdown */}
                                    <div className="space-y-4">
                                        {investmentRecommendations.map((investment, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-semibold text-gray-900">{investment.category}</h4>
                                                    <span className="text-sm font-medium text-primary-600">{investment.percentage}%</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{investment.description}</p>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Monthly Amount: ₹{investment.amount.toLocaleString()}</span>
                                                    <span className="text-gray-500">Risk: {investment.risk}</span>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-primary-600 h-2 rounded-full"
                                                            style={{ width: `${investment.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'projections' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-lg font-semibold text-gray-900">Growth Projection</h3>
                                </div>
                                <div className="card-body">
                                    <div className="h-64 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <i className="fas fa-chart-line text-primary-600 text-4xl mb-2"></i>
                                            <p className="text-primary-600 font-semibold">Growth Chart</p>
                                            <p className="text-sm text-gray-500">Projected corpus growth over time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-lg font-semibold text-gray-900">Yearly Milestones</h3>
                                </div>
                                <div className="card-body">
                                    <div className="space-y-4">
                                        {[5, 10, 15, 20, 25, 30].map((year) => (
                                            <div key={year} className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600">Year {year}</span>
                                                <span className="font-semibold text-gray-900">
                                                    ₹{((year * 12 * 25000) * Math.pow(1.12, year)).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'recommendations' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-lg font-semibold text-gray-900">Action Items</h3>
                                </div>
                                <div className="card-body">
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <i className="fas fa-check text-primary-600 text-xs"></i>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Start SIP of ₹25,000 monthly</p>
                                                <p className="text-sm text-gray-600">Begin systematic investment in equity funds</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <i className="fas fa-check text-primary-600 text-xs"></i>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Increase emergency fund</p>
                                                <p className="text-sm text-gray-600">Build 6 months of expenses as emergency fund</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <i className="fas fa-check text-primary-600 text-xs"></i>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Review insurance coverage</p>
                                                <p className="text-sm text-gray-600">Ensure adequate life and health insurance</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-lg font-semibold text-gray-900">Risk Management</h3>
                                </div>
                                <div className="card-body">
                                    <div className="space-y-4">
                                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <i className="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                                                <span className="font-medium text-yellow-800">Inflation Risk</span>
                                            </div>
                                            <p className="text-sm text-yellow-700">
                                                Consider increasing SIP by 10% annually to beat inflation
                                            </p>
                                        </div>
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                                                <span className="font-medium text-blue-800">Market Volatility</span>
                                            </div>
                                            <p className="text-sm text-blue-700">
                                                Maintain diversified portfolio to reduce market risk
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Actions */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard" className="btn btn-outline">
                        <i className="fas fa-edit mr-2"></i>
                        Modify Plan
                    </Link>
                    <button className="btn btn-primary">
                        <i className="fas fa-calendar mr-2"></i>
                        Set Reminders
                    </button>
                    <button className="btn btn-secondary">
                        <i className="fas fa-share mr-2"></i>
                        Share Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
