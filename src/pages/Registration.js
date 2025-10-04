import React, { useState } from 'react';
import { SignUp } from '@clerk/clerk-react';

const Registration = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        location: '',
        maritalStatus: '',
        dependents: '',
        // Income & Security
        monthlyIncome: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleEmailVerification = async () => {
        if (!formData.email) {
            setErrors(prev => ({
                ...prev,
                email: 'Email is required for verification'
            }));
            return;
        }

        setIsVerifying(true);

        // Simulate email verification process
        setTimeout(() => {
            setIsEmailVerified(true);
            setIsVerifying(false);
            setErrors(prev => ({
                ...prev,
                email: ''
            }));
        }, 2000);
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
            } else if (!isEmailVerified) {
                newErrors.email = 'Please verify your email first';
            }
            if (!formData.age.trim()) newErrors.age = 'Age is required';
            if (!formData.location.trim()) newErrors.location = 'Location is required';
            if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
            if (!formData.dependents.trim()) newErrors.dependents = 'Number of dependents is required';
        } else if (step === 2) {
            if (!formData.monthlyIncome.trim()) newErrors.monthlyIncome = 'Monthly income is required';
            if (!formData.password.trim()) newErrors.password = 'Password is required';
            if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setIsAnimating(false);
            }, 300);
        }
    };

    const prevStep = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentStep(prev => prev - 1);
            setIsAnimating(false);
        }, 300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Handle form submission
            console.log('Form submitted:', formData);
            alert('Registration successful! Please check your email for verification.');
        }
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            location: '',
            maritalStatus: '',
            dependents: '',
            monthlyIncome: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
        setCurrentStep(1);
        setIsEmailVerified(false);
        setIsVerifying(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="card">
                    <div className="card-header">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                            <p className="text-gray-600">Join our AI-powered retirement planning platform</p>
                        </div>
                    </div>

                    <div className="card-body">
                        {/* Progress Indicator */}
                        <div className="mb-8">
                            <div className="flex items-center justify-center space-x-4">
                                <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        1
                                    </div>
                                    <span className="ml-2 text-sm font-medium">Personal Data</span>
                                </div>
                                <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                                <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        2
                                    </div>
                                    <span className="ml-2 text-sm font-medium">Income Inputs</span>
                                </div>
                            </div>
                        </div>

                        {/* Google Registration Option */}
                        <div className="flex justify-center ">
                            <div className="text-center mb-4">
                                {/* <p className="text-gray-600 text-sm">Or continue with</p> */}
                            </div>
                            <SignUp
                                appearance={{
                                    elements: {
                                        formButtonPrimary: 'hidden',
                                        card: 'shadow-none border-0',
                                        headerTitle: 'hidden',
                                        headerSubtitle: 'hidden',
                                        socialButtonsBlockButton: 'w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 flex items-center justify-center text-gray-700 font-medium',
                                        socialButtonsBlockButtonText: 'flex items-center text-sm font-medium',
                                        socialButtonsProviderIcon__google: 'w-5 h-5 mr-3',
                                        socialButtonsBlockButtonArrow: 'hidden',
                                        formFieldInput: 'hidden',
                                        formFieldLabel: 'hidden',
                                        formFieldRow: 'hidden',
                                        footerActionText: 'hidden',
                                        footerActionLink: 'hidden'
                                    }
                                }}
                                redirectUrl="/dashboard"
                            />
                        </div>

                        

                        {/* Custom Registration Form */}
                        <form onSubmit={handleSubmit} className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="form-label">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                                                placeholder="Enter your first name"
                                            />
                                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                        </div>

                                        <div>
                                            <label className="form-label">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                                                placeholder="Enter your last name"
                                            />
                                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="form-label">Email Address *</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`form-input flex-1 ${errors.email ? 'border-red-500' : ''}`}
                                                placeholder="Enter your email address"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleEmailVerification}
                                                disabled={isVerifying || isEmailVerified || !formData.email}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEmailVerified
                                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                                    : isVerifying
                                                        ? 'bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed'
                                                        : 'bg-primary-600 text-white hover:bg-primary-700'
                                                    }`}
                                            >
                                                {isVerifying ? 'Sending...' : isEmailVerified ? 'Verified ✓' : 'Verify'}
                                            </button>
                                        </div>
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="form-label">Age *</label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className={`form-input ${errors.age ? 'border-red-500' : ''}`}
                                                placeholder="Enter your age"
                                                min="18"
                                                max="100"
                                            />
                                            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                                        </div>

                                        <div>
                                            <label className="form-label">Location *</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className={`form-input ${errors.location ? 'border-red-500' : ''}`}
                                                placeholder="City, Country"
                                            />
                                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="form-label">Marital Status *</label>
                                            <select
                                                name="maritalStatus"
                                                value={formData.maritalStatus}
                                                onChange={handleChange}
                                                className={`form-input ${errors.maritalStatus ? 'border-red-500' : ''}`}
                                            >
                                                <option value="">Select status</option>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                                <option value="divorced">Divorced</option>
                                                <option value="widowed">Widowed</option>
                                            </select>
                                            {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}
                                        </div>

                                        <div>
                                            <label className="form-label">Number of Dependents *</label>
                                            <input
                                                type="number"
                                                name="dependents"
                                                value={formData.dependents}
                                                onChange={handleChange}
                                                className={`form-input ${errors.dependents ? 'border-red-500' : ''}`}
                                                placeholder="0"
                                                min="0"
                                            />
                                            {errors.dependents && <p className="text-red-500 text-sm mt-1">{errors.dependents}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Income & Security</h2>

                                    <div>
                                        <label className="form-label">Monthly Income *</label>
                                        <input
                                            type="number"
                                            name="monthlyIncome"
                                            value={formData.monthlyIncome}
                                            onChange={handleChange}
                                            className={`form-input ${errors.monthlyIncome ? 'border-red-500' : ''}`}
                                            placeholder="Enter your monthly income"
                                            min="0"
                                        />
                                        {errors.monthlyIncome && <p className="text-red-500 text-sm mt-1">{errors.monthlyIncome}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="form-label">Password *</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                                                placeholder="Create a strong password"
                                            />
                                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label className="form-label">Confirm Password *</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                                placeholder="Confirm your password"
                                            />
                                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex justify-between mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${currentStep === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    Previous
                                </button>

                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Reset
                                    </button>

                                    {currentStep < 2 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!isEmailVerified}
                                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${!isEmailVerified
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-primary-600 text-white hover:bg-primary-700'
                                                }`}
                                        >
                                            {!isEmailVerified ? 'Verify Email First' : 'Next Step'}
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Create Account
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Additional Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Registration</h3>
                        <p className="text-gray-600 text-sm">Your data is protected with enterprise-grade security</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Setup</h3>
                        <p className="text-gray-600 text-sm">Get started with retirement planning in minutes</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
                        <p className="text-gray-600 text-sm">Advanced algorithms for personalized planning</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;