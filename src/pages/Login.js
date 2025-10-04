import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                console.log('Login attempt:', formData);
                alert('Login successful! Redirecting to dashboard...');
                setIsLoading(false);
                // In a real app, you would redirect here
                // navigate('/dashboard');
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <div className="card">
                    <div className="card-header">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-sign-in-alt text-primary-600 text-2xl"></i>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                            <p className="text-gray-600">Sign in to your AI Retirement Planner account</p>
                        </div>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-envelope text-gray-400"></i>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-lock text-gray-400"></i>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-input pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Sign In
                                    </>
                                )}
                            </button>

                            <div className="text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/registration" className="text-primary-600 hover:text-primary-700 font-medium">
                                        Create one here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Additional Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card p-4 text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-shield-alt text-primary-600"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">Secure Login</h3>
                        <p className="text-sm text-gray-600">Bank-level encryption</p>
                    </div>

                    <div className="card p-4 text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-mobile-alt text-primary-600"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">Mobile Access</h3>
                        <p className="text-sm text-gray-600">Access anywhere</p>
                    </div>

                    <div className="card p-4 text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-clock text-primary-600"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
                        <p className="text-sm text-gray-600">Always available</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
