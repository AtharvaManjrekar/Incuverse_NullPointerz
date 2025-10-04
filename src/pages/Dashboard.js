import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        monthlyIncome: '',
        fixedExpenses: '',
        variableExpenses: '',
        retirementAge: '',
        currentSavings: {
            fd: '',
            sip: '',
            mutualFunds: '',
            other: ''
        },
        currentDebt: '',
        desiredCorpus: ''
    });

    const [errors, setErrors] = useState({});
    const [isCalculating, setIsCalculating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('currentSavings.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                currentSavings: {
                    ...prev.currentSavings,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.monthlyIncome || formData.monthlyIncome < 0) {
            newErrors.monthlyIncome = 'Please enter a valid monthly income';
        }
        if (!formData.fixedExpenses || formData.fixedExpenses < 0) {
            newErrors.fixedExpenses = 'Please enter valid fixed expenses';
        }
        if (!formData.variableExpenses || formData.variableExpenses < 0) {
            newErrors.variableExpenses = 'Please enter valid variable expenses';
        }
        if (!formData.retirementAge || formData.retirementAge < 50 || formData.retirementAge > 80) {
            newErrors.retirementAge = 'Please enter a valid retirement age (50-80)';
        }
        if (!formData.currentDebt || formData.currentDebt < 0) {
            newErrors.currentDebt = 'Please enter valid current debt amount';
        }
        if (!formData.desiredCorpus || formData.desiredCorpus < 0) {
            newErrors.desiredCorpus = 'Please enter a valid desired retirement corpus';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsCalculating(true);
            // Simulate calculation
            setTimeout(() => {
                console.log('Form submitted:', formData);
                setIsCalculating(false);
                // In a real app, you would navigate to results
                // navigate('/results');
                alert('Calculation complete! Redirecting to results...');
            }, 2000);
        }
    };

    const handleReset = () => {
        setFormData({
            monthlyIncome: '',
            fixedExpenses: '',
            variableExpenses: '',
            retirementAge: '',
            currentSavings: {
                fd: '',
                sip: '',
                mutualFunds: '',
                other: ''
            },
            currentDebt: '',
            desiredCorpus: ''
        });
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Retirement Planning Dashboard</h1>
                    <p className="text-gray-600">Enter your financial details to get AI-powered retirement recommendations</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Income & Expenses */}
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                        <i className="fas fa-wallet text-primary-600 mr-3"></i>
                                        Income & Expenses
                                    </h2>
                                </div>
                                <div className="card-body space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="monthlyIncome" className="form-label">
                                                Monthly Income (₹) *
                                            </label>
                                            <input
                                                type="number"
                                                id="monthlyIncome"
                                                name="monthlyIncome"
                                                value={formData.monthlyIncome}
                                                onChange={handleChange}
                                                className={`form-input ${errors.monthlyIncome ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                placeholder="Enter your monthly income"
                                                min="0"
                                            />
                                            {errors.monthlyIncome && <p className="text-red-500 text-sm mt-1">{errors.monthlyIncome}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="retirementAge" className="form-label">
                                                Desired Retirement Age *
                                            </label>
                                            <input
                                                type="number"
                                                id="retirementAge"
                                                name="retirementAge"
                                                value={formData.retirementAge}
                                                onChange={handleChange}
                                                className={`form-input ${errors.retirementAge ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                placeholder="Enter retirement age"
                                                min="50"
                                                max="80"
                                            />
                                            {errors.retirementAge && <p className="text-red-500 text-sm mt-1">{errors.retirementAge}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="fixedExpenses" className="form-label">
                                                Fixed Expenses (₹) *
                                            </label>
                                            <input
                                                type="number"
                                                id="fixedExpenses"
                                                name="fixedExpenses"
                                                value={formData.fixedExpenses}
                                                onChange={handleChange}
                                                className={`form-input ${errors.fixedExpenses ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                placeholder="Rent, EMI, insurance, etc."
                                                min="0"
                                            />
                                            {errors.fixedExpenses && <p className="text-red-500 text-sm mt-1">{errors.fixedExpenses}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="variableExpenses" className="form-label">
                                                Variable Expenses (₹) *
                                            </label>
                                            <input
                                                type="number"
                                                id="variableExpenses"
                                                name="variableExpenses"
                                                value={formData.variableExpenses}
                                                onChange={handleChange}
                                                className={`form-input ${errors.variableExpenses ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                placeholder="Food, entertainment, shopping, etc."
                                                min="0"
                                            />
                                            {errors.variableExpenses && <p className="text-red-500 text-sm mt-1">{errors.variableExpenses}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Current Savings */}
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                        <i className="fas fa-piggy-bank text-primary-600 mr-3"></i>
                                        Current Savings & Investments
                                    </h2>
                                </div>
                                <div className="card-body space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="currentSavings.fd" className="form-label">
                                                Fixed Deposits (₹)
                                            </label>
                                            <input
                                                type="number"
                                                id="currentSavings.fd"
                                                name="currentSavings.fd"
                                                value={formData.currentSavings.fd}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="FD amount"
                                                min="0"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="currentSavings.sip" className="form-label">
                                                SIP Investments (₹)
                                            </label>
                                            <input
                                                type="number"
                                                id="currentSavings.sip"
                                                name="currentSavings.sip"
                                                value={formData.currentSavings.sip}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="Monthly SIP amount"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="currentSavings.mutualFunds" className="form-label">
                                                Mutual Funds (₹)
                                            </label>
                                            <input
                                                type="number"
                                                id="currentSavings.mutualFunds"
                                                name="currentSavings.mutualFunds"
                                                value={formData.currentSavings.mutualFunds}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="Mutual fund investments"
                                                min="0"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="currentSavings.other" className="form-label">
                                                Other Investments (₹)
                                            </label>
                                            <input
                                                type="number"
                                                id="currentSavings.other"
                                                name="currentSavings.other"
                                                value={formData.currentSavings.other}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="Stocks, bonds, etc."
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Debt & Goals */}
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                        <i className="fas fa-chart-line text-primary-600 mr-3"></i>
                                        Debt & Retirement Goals
                                    </h2>
                                </div>
                                <div className="card-body space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="currentDebt" className="form-label">
                                                Current Debt (₹) *
                                            </label>
                                            <input
                                                type="number"
                                                id="currentDebt"
                                                name="currentDebt"
                                                value={formData.currentDebt}
                                                onChange={handleChange}
                                                className={`form-input ${errors.currentDebt ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                placeholder="Home loan, personal loan, etc."
                                                min="0"
                                            />
                                            {errors.currentDebt && <p className="text-red-500 text-sm mt-1">{errors.currentDebt}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="desiredCorpus" className="form-label">
                                                Desired Retirement Corpus (₹) *
                                            </label>
                                            <input
                                                type="number"
                                                id="desiredCorpus"
                                                name="desiredCorpus"
                                                value={formData.desiredCorpus}
                                                onChange={handleChange}
                                                className={`form-input ${errors.desiredCorpus ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                placeholder="Target retirement amount"
                                                min="0"
                                            />
                                            {errors.desiredCorpus && <p className="text-red-500 text-sm mt-1">{errors.desiredCorpus}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
                                    disabled={isCalculating}
                                    className="btn btn-primary flex-1"
                                >
                                    {isCalculating ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin mr-2"></i>
                                            Calculating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-calculator mr-2"></i>
                                            Calculate Retirement Plan
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="btn btn-outline flex-1"
                                >
                                    <i className="fas fa-undo mr-2"></i>
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Tips */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <i className="fas fa-lightbulb text-primary-600 mr-2"></i>
                                    Quick Tips
                                </h3>
                            </div>
                            <div className="card-body">
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span>Start saving early for compound interest benefits</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span>Diversify your investments across asset classes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span>Consider inflation while planning retirement</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span>Review and adjust your plan annually</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Progress Tracker */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <i className="fas fa-chart-pie text-primary-600 mr-2"></i>
                                    Form Progress
                                </h3>
                            </div>
                            <div className="card-body">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Income & Expenses</span>
                                        <span className="text-primary-600">✓</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Current Savings</span>
                                        <span className="text-primary-600">✓</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Debt & Goals</span>
                                        <span className="text-primary-600">✓</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Form completion: 100%</p>
                                </div>
                            </div>
                        </div>

                        {/* Help & Support */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <i className="fas fa-question-circle text-primary-600 mr-2"></i>
                                    Need Help?
                                </h3>
                            </div>
                            <div className="card-body">
                                <p className="text-sm text-gray-600 mb-4">
                                    Our AI-powered system will analyze your inputs and provide personalized recommendations.
                                </p>
                                <div className="space-y-2">
                                    <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                                        <i className="fas fa-phone mr-1"></i>
                                        Contact Support
                                    </a>
                                    <br />
                                    <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                                        <i className="fas fa-book mr-1"></i>
                                        Help Center
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
