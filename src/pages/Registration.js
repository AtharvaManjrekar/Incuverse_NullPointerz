import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Data
        name: '',
        age: '',
        email: '',
        location: '',
        maritalStatus: '',
        dependents: '',
        // Income Information
        basicIncome: '',
        additionalIncome: '',
        monthlyExpenses: '',
        // Security
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
        // Reset email verification if email changes
        if (name === 'email' && isEmailVerified) {
            setIsEmailVerified(false);
        }
    };

    const handleEmailVerification = async () => {
        if (!formData.email.trim()) {
            setErrors(prev => ({
                ...prev,
                email: 'Please enter an email address first'
            }));
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErrors(prev => ({
                ...prev,
                email: 'Please enter a valid email address'
            }));
            return;
        }

        setIsVerifying(true);

        // Simulate email verification process
        setTimeout(() => {
            setIsVerifying(false);
            setIsEmailVerified(true);
            setErrors(prev => ({
                ...prev,
                email: ''
            }));
            alert('Verification email sent! Please check your inbox and click the verification link.');
        }, 2000);
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            // Personal Data validation
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.age || formData.age < 18 || formData.age > 100) {
                newErrors.age = 'Please enter a valid age (18-100)';
            }
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            } else if (!isEmailVerified) {
                newErrors.email = 'Please verify your email address first';
            }
            if (!formData.location.trim()) newErrors.location = 'Location is required';
            if (!formData.maritalStatus) newErrors.maritalStatus = 'Please select marital status';
            if (!formData.dependents || formData.dependents < 0) {
                newErrors.dependents = 'Please enter a valid number of dependents';
            }
        } else if (step === 2) {
            // Income Information validation
            if (!formData.basicIncome || formData.basicIncome < 0) {
                newErrors.basicIncome = 'Please enter a valid basic income amount';
            }
            if (formData.additionalIncome && formData.additionalIncome < 0) {
                newErrors.additionalIncome = 'Please enter a valid additional income amount';
            }
            if (!formData.monthlyExpenses || formData.monthlyExpenses < 0) {
                newErrors.monthlyExpenses = 'Please enter valid monthly expenses';
            }
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters long';
            }
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
        if (validateStep(2)) {
            // Handle form submission
            console.log('Form submitted:', formData);
            alert('Registration successful! Please check your email for verification.');
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            age: '',
            email: '',
            location: '',
            maritalStatus: '',
            dependents: '',
            basicIncome: '',
            additionalIncome: '',
            monthlyExpenses: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
        setCurrentStep(1);
        setIsEmailVerified(false);
        setIsVerifying(false);
    };

    const steps = [
        {
            number: 1,
            title: 'Personal Information',
            description: 'Tell us about yourself',
            icon: 'fa-user'
        },
        {
            number: 2,
            title: 'Income & Security',
            description: 'Financial details and account setup',
            icon: 'fa-wallet'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                        <i className="fas fa-user-plus text-white text-3xl"></i>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in-up">Create Your Account</h1>
                    <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-200">
                        Join our AI-powered retirement planning platform
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-8">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentStep >= step.number
                                    ? 'bg-primary-600 border-primary-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-400'
                                    }`}>
                                    <i className={`fas ${step.icon} ${currentStep >= step.number ? 'text-white' : 'text-gray-400'}`}></i>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-16 h-1 mx-4 transition-all duration-300 ${currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {steps[currentStep - 1].title}
                        </h2>
                        <p className="text-gray-600">{steps[currentStep - 1].description}</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>

                                {/* Step 1: Personal Information */}
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                                                <i className="fas fa-user text-white text-2xl"></i>
                                            </div>
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                                            <p className="text-gray-600">Tell us about yourself to get started</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="form-label">
                                                        <i className="fas fa-user mr-2 text-primary-600"></i>
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Enter your full name"
                                                    />
                                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="age" className="form-label">
                                                        <i className="fas fa-calendar mr-2 text-primary-600"></i>
                                                        Age *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="age"
                                                        name="age"
                                                        value={formData.age}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.age ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Enter your age"
                                                        min="18"
                                                        max="100"
                                                    />
                                                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="email" className="form-label">
                                                        <i className="fas fa-envelope mr-2 text-primary-600"></i>
                                                        Email Address *
                                                    </label>
                                                    <div className="flex gap-2 mb-8">
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className={`form-input flex-1 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${isEmailVerified ? 'border-green-500 bg-green-50' : ''}`}
                                                            placeholder="Enter your email (verification required)"
                                                            disabled={isVerifying}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleEmailVerification}
                                                            disabled={isVerifying || isEmailVerified || !formData.email.trim()}
                                                            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isEmailVerified
                                                                ? 'bg-green-100 text-green-700 border border-green-300 cursor-not-allowed'
                                                                : isVerifying
                                                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                                                    : 'bg-primary-600 text-white hover:bg-primary-700'
                                                                }`}
                                                        >
                                                            {isEmailVerified ? (
                                                                <>
                                                                    <i className="fas fa-check mr-2"></i>
                                                                    Verified
                                                                </>
                                                            ) : isVerifying ? (
                                                                <>
                                                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                                                    Sending...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className="fas fa-paper-plane mr-2"></i>
                                                                    Verify
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>

                                                    {isEmailVerified && (
                                                        <div className="flex items-center mt-2 text-green-600 text-sm">
                                                            <i className="fas fa-check-circle mr-2"></i>
                                                            Email verified successfully!
                                                        </div>
                                                    )}

                                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                                </div>

                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="location" className="form-label">
                                                        <i className="fas fa-map-marker-alt mr-2 text-primary-600"></i>
                                                        Location *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.location ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Enter your city, state"
                                                    />
                                                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="maritalStatus" className="form-label">
                                                        <i className="fas fa-heart mr-2 text-primary-600"></i>
                                                        Marital Status *
                                                    </label>
                                                    <select
                                                        id="maritalStatus"
                                                        name="maritalStatus"
                                                        value={formData.maritalStatus}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.maritalStatus ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                    >
                                                        <option value="">Select marital status</option>
                                                        <option value="single">Single</option>
                                                        <option value="married">Married</option>
                                                        <option value="divorced">Divorced</option>
                                                        <option value="widowed">Widowed</option>
                                                    </select>
                                                    {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="dependents" className="form-label">
                                                        <i className="fas fa-users mr-2 text-primary-600"></i>
                                                        Number of Dependents *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="dependents"
                                                        name="dependents"
                                                        value={formData.dependents}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.dependents ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Enter number of dependents"
                                                        min="0"
                                                    />
                                                    {errors.dependents && <p className="text-red-500 text-sm mt-1">{errors.dependents}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Income & Security */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                                                <i className="fas fa-wallet text-white text-2xl"></i>
                                            </div>
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Income & Security</h3>
                                            <p className="text-gray-600">Financial details and account security</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="basicIncome" className="form-label">
                                                        <i className="fas fa-rupee-sign mr-2 text-primary-600"></i>
                                                        Annual Income (₹) *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="basicIncome"
                                                        name="basicIncome"
                                                        value={formData.basicIncome}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.basicIncome ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Enter your annual income"
                                                        min="0"
                                                    />
                                                    {errors.basicIncome && <p className="text-red-500 text-sm mt-1">{errors.basicIncome}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="additionalIncome" className="form-label">
                                                        <i className="fas fa-plus-circle mr-2 text-primary-600"></i>
                                                        Additional Income (₹)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="additionalIncome"
                                                        name="additionalIncome"
                                                        value={formData.additionalIncome}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.additionalIncome ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Freelance, investments, etc."
                                                        min="0"
                                                    />
                                                    {errors.additionalIncome && <p className="text-red-500 text-sm mt-1">{errors.additionalIncome}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="monthlyExpenses" className="form-label">
                                                        <i className="fas fa-chart-pie mr-2 text-primary-600"></i>
                                                        Monthly Expenses (₹) *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="monthlyExpenses"
                                                        name="monthlyExpenses"
                                                        value={formData.monthlyExpenses}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.monthlyExpenses ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Your monthly expenses"
                                                        min="0"
                                                    />
                                                    {errors.monthlyExpenses && <p className="text-red-500 text-sm mt-1">{errors.monthlyExpenses}</p>}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="password" className="form-label">
                                                        <i className="fas fa-lock mr-2 text-primary-600"></i>
                                                        Password *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Create a strong password"
                                                    />
                                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="confirmPassword" className="form-label">
                                                        <i className="fas fa-lock mr-2 text-primary-600"></i>
                                                        Confirm Password *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                        placeholder="Confirm your password"
                                                    />
                                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                                </div>

                                                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                                                    <div className="flex items-start">
                                                        <i className="fas fa-info-circle text-primary-600 mr-3 mt-1"></i>
                                                        <div>
                                                            <h4 className="font-medium text-primary-800 mb-1">Password Requirements</h4>
                                                            <ul className="text-sm text-primary-700 space-y-1">
                                                                <li>• At least 8 characters long</li>
                                                                <li>• Include uppercase and lowercase letters</li>
                                                                <li>• Include numbers and special characters</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between pt-6 border-t border-gray-200">
                                    <div>
                                        {currentStep > 1 && (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="btn btn-outline"
                                            >
                                                <i className="fas fa-arrow-left mr-2"></i>
                                                Previous
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="btn btn-outline"
                                        >
                                            <i className="fas fa-undo mr-2"></i>
                                            Reset
                                        </button>

                                        {currentStep < 2 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!isEmailVerified}
                                                className={`btn ${isEmailVerified ? 'btn-primary' : 'btn-outline opacity-50 cursor-not-allowed'}`}
                                            >
                                                {isEmailVerified ? (
                                                    <>
                                                        Next Step
                                                        <i className="fas fa-arrow-right ml-2"></i>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-envelope mr-2"></i>
                                                        Verify Email First
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                <i className="fas fa-user-plus mr-2"></i>
                                                Create Account
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Login Link */}
                                <div className="text-center pt-4">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
