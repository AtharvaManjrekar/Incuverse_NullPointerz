import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { addData } from './firestore';
import { useAuth } from '../contexts/AuthContext';

const Registration = () => {
    const navigate = useNavigate();
    const { setUser, setUserData } = useAuth();
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
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [checkInterval, setCheckInterval] = useState(null);
    const [isCheckingVerification, setIsCheckingVerification] = useState(false);
    const [tempUserCredentials, setTempUserCredentials] = useState(null);

    // Monitor email verification status
    useEffect(() => {
        if (verificationSent && !isEmailVerified) {
            const interval = setInterval(async () => {
                try {
                    // Since user is signed out, we can't check verification status automatically
                    // The user will need to use the "Check Verification" button manually
                    console.log('Email verification monitoring active - use manual check button');
                } catch (error) {
                    console.log('Error checking verification status:', error);
                }
            }, 2000); // Check every 2 seconds

            setCheckInterval(interval);

            // Cleanup interval on component unmount
            return () => {
                if (interval) {
                    clearInterval(interval);
                }
            };
        }
    }, [verificationSent, isEmailVerified]);

    // Cleanup interval when email is verified
    useEffect(() => {
        if (isEmailVerified && checkInterval) {
            clearInterval(checkInterval);
            setCheckInterval(null);
        }
    }, [isEmailVerified, checkInterval]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};
        let isValid = true;

        if (step === 1) {
            if (!formData.firstName.trim()) {
                newErrors.firstName = 'First Name is required';
                isValid = false;
            }
            if (!formData.lastName.trim()) {
                newErrors.lastName = 'Last Name is required';
                isValid = false;
            }
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
                isValid = false;
            } else if (!/\S+@\S+\.\S/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
                isValid = false;
            }
            if (!formData.password.trim()) {
                newErrors.password = 'Password is required';
                isValid = false;
            } else if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
                isValid = false;
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
                isValid = false;
            }
            if (!formData.age.trim()) {
                newErrors.age = 'Age is required';
                isValid = false;
            } else if (isNaN(formData.age) || parseInt(formData.age) < 18) {
                newErrors.age = 'Age must be a number and at least 18';
                isValid = false;
            }
            if (!formData.location.trim()) {
                newErrors.location = 'Location is required';
                isValid = false;
            }
            if (!formData.maritalStatus.trim()) {
                newErrors.maritalStatus = 'Marital Status is required';
                isValid = false;
            }
            if (!formData.dependents.trim()) {
                newErrors.dependents = 'Number of Dependents is required';
                isValid = false;
            } else if (isNaN(formData.dependents) || parseInt(formData.dependents) < 0) {
                newErrors.dependents = 'Dependents must be a non-negative number';
                isValid = false;
            }
        } else if (step === 2) {
            if (!formData.monthlyIncome.trim()) {
                newErrors.monthlyIncome = 'Monthly Income is required';
                isValid = false;
            } else if (isNaN(formData.monthlyIncome) || parseFloat(formData.monthlyIncome) <= 0) {
                newErrors.monthlyIncome = 'Monthly Income must be a positive number';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNextStep = async () => {
        if (validateStep(currentStep)) {
            if (currentStep === 1) {
                setIsAnimating(true);
                setTimeout(() => {
                    setCurrentStep(2);
                    setIsAnimating(false);
                }, 300);
            }
        }
    };

    const handlePreviousStep = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentStep(1);
            setIsAnimating(false);
        }, 300);
    };

    const handleEmailVerification = async () => {
        if (!formData.email || !formData.password) {
            setErrors((prev) => ({
                ...prev,
                email: "Email and password are required.",
            }));
            return;
        }

        setIsCreatingAccount(true);
        setErrors({});

        try {
            // Create user with REAL password - PRODUCTION READY
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Set display name (with error handling)
            try {
                if (user && typeof user.updateProfile === 'function') {
                    await user.updateProfile({
                        displayName: `${formData.firstName} ${formData.lastName}`
                    });
                    console.log("✅ Display name set successfully");
                } else {
                    console.log("⚠️ updateProfile method not available, skipping display name update");
                    // Store display name in localStorage as fallback
                    localStorage.setItem('userDisplayName', `${formData.firstName} ${formData.lastName}`);
                }
            } catch (profileError) {
                console.log("⚠️ Profile update failed, continuing with verification:", profileError);
                // Store display name in localStorage as fallback
                localStorage.setItem('userDisplayName', `${formData.firstName} ${formData.lastName}`);
            }

            // Send verification email
            await sendEmailVerification(user);
            console.log("✅ Verification email sent successfully to:", formData.email);
            setVerificationSent(true);

            // Store user credentials temporarily for verification checking
            setTempUserCredentials({
                email: formData.email,
                password: formData.password
            });

            // Sign out the user immediately after sending verification email
            // This prevents the navbar from showing logged-in state during registration
            try {
                await signOut(auth);
                setUser(null);
                setUserData(null);
                console.log("✅ User signed out after sending verification email");
            } catch (signOutError) {
                console.log("⚠️ Sign out failed after verification email:", signOutError);
                // Still clear AuthContext state
                setUser(null);
                setUserData(null);
            }

            alert(`Verification email sent to ${formData.email}. Please check your email and click the verification link to continue.`);

        } catch (error) {
            setIsCreatingAccount(false);
            let errorMessage = 'Failed to create account. Please try again.';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already in use. Please login or use a different email.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'The email address is invalid.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'The password is too weak. Please use a stronger password.';
                    break;
                default:
                    errorMessage = error.message;
            }
            setErrors(prev => ({
                ...prev,
                email: errorMessage
            }));
            console.error("Firebase registration error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            try {
                console.log("Form submitted:", formData);

                // Check if email is verified
                if (!isEmailVerified) {
                    alert("Please verify your email before completing registration!");
                    return;
                }

                // Check if we have stored credentials
                if (!tempUserCredentials) {
                    alert("Registration session expired. Please start over.");
                    return;
                }

                // Sign in temporarily to get user data for Firestore
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    tempUserCredentials.email,
                    tempUserCredentials.password
                );
                const user = userCredential.user;

                // Prepare data for Firestore
                const userData = {
                    userId: user.uid,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    age: parseInt(formData.age),
                    location: formData.location,
                    maritalStatus: formData.maritalStatus,
                    dependents: parseInt(formData.dependents),
                    monthlyIncome: parseFloat(formData.monthlyIncome),
                    password: formData.password,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                // Store data in Firestore
                try {
                    console.log("🔍 Storing user data in Firestore:", userData);
                    const result = await addData('users', userData);
                    console.log("🔍 Firestore result:", result);

                    if (result.success) {
                        console.log("✅ User data stored successfully in Firestore:", result.id);

                        // Sign out the user after successful registration
                        try {
                            await signOut(auth);
                            // Also clear AuthContext state manually
                            setUser(null);
                            setUserData(null);
                            // Clear temporary credentials
                            setTempUserCredentials(null);
                            console.log("✅ User signed out after registration");
                        } catch (signOutError) {
                            console.log("⚠️ Sign out failed, but registration was successful:", signOutError);
                            // Still clear AuthContext state even if signOut fails
                            setUser(null);
                            setUserData(null);
                            setTempUserCredentials(null);
                        }

                        alert("Registration successful! Please login to continue.");
                        navigate("/login");
                    } else {
                        throw new Error(result.error);
                    }
                } catch (firestoreError) {
                    console.error("❌ Firestore error:", firestoreError);
                    // Sign out after error
                    try {
                        await signOut(auth);
                        setUser(null);
                        setUserData(null);
                    } catch (signOutError) {
                        console.log("Sign out error:", signOutError);
                    }
                    alert("Registration completed but data storage failed. Please try again.");
                }
            } catch (error) {
                console.error("Error during registration:", error);
                // Sign out after error
                try {
                    await signOut(auth);
                    setUser(null);
                    setUserData(null);
                } catch (signOutError) {
                    console.log("Sign out error:", signOutError);
                }
                alert("An error occurred during registration. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col justify-center">
            <div className="card w-full p-6 shadow-lg border rounded-lg">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-user-plus text-primary-600 text-2xl"></i>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                    <p className="text-gray-600">Join us to plan your perfect retirement</p>
                </div>

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
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Age *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className={`form-input ${errors.age ? 'border-red-500' : ''}`}
                                        placeholder="Your current age"
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
                                        placeholder="Your city or region"
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
                                        className={`form-select ${errors.maritalStatus ? 'border-red-500' : ''}`}
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
                                        placeholder="E.g., 0, 1, 2"
                                    />
                                    {errors.dependents && <p className="text-red-500 text-sm mt-1">{errors.dependents}</p>}
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={handleEmailVerification}
                                    disabled={isCreatingAccount || isEmailVerified || !formData.email || !formData.password}
                                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEmailVerified
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : isCreatingAccount
                                            ? 'bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed'
                                            : 'bg-primary-600 text-white hover:bg-primary-700'
                                        }`}
                                >
                                    {isCreatingAccount ? 'Sending...' : isEmailVerified ? 'Verified ✓' : 'Send Verification Email'}
                                </button>
                            </div>

                            {/* Email Verification Status */}
                            {verificationSent && !isEmailVerified && (
                                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-2">
                                                <i className="fas fa-envelope text-blue-600 mr-2"></i>
                                                <p className="text-sm text-blue-800 font-medium">Verification email sent!</p>
                                            </div>
                                            <p className="text-xs text-blue-600 mb-2">Please check your email and click the verification link to continue.</p>
                                            <p className="text-xs text-blue-500">After clicking the link, come back here and click "Check Verification" below.</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                setIsCheckingVerification(true);
                                                try {
                                                    if (tempUserCredentials) {
                                                        // Sign in temporarily to check verification status
                                                        const userCredential = await signInWithEmailAndPassword(
                                                            auth,
                                                            tempUserCredentials.email,
                                                            tempUserCredentials.password
                                                        );
                                                        const user = userCredential.user;

                                                        if (user.emailVerified) {
                                                            console.log('✅ Email verified!');
                                                            setIsEmailVerified(true);
                                                            alert('✅ Email verified successfully! You can now continue.');

                                                            // Sign out again to maintain the logged-out state
                                                            await signOut(auth);
                                                            setUser(null);
                                                            setUserData(null);
                                                        } else {
                                                            console.log('Email not verified yet');
                                                            alert('Email not verified yet. Please check your email and click the verification link.');

                                                            // Sign out after checking
                                                            await signOut(auth);
                                                            setUser(null);
                                                            setUserData(null);
                                                        }
                                                    } else {
                                                        alert('Verification credentials not available. Please try sending the verification email again.');
                                                    }
                                                } catch (error) {
                                                    console.error('Error checking verification:', error);
                                                    alert('Error checking verification. Please try again.');
                                                } finally {
                                                    setIsCheckingVerification(false);
                                                }
                                            }}
                                            disabled={isCheckingVerification}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center ${isCheckingVerification
                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                                }`}
                                        >
                                            {isCheckingVerification ? (
                                                <>
                                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                                    Checking...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-check-circle mr-2"></i>
                                                    Check Verification
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {isEmailVerified && (
                                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center">
                                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                                        <p className="text-sm text-green-800 font-medium">Email verified successfully! You can now proceed to the next step.</p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={!isEmailVerified}
                                className={`w-full py-3 px-4 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center justify-center ${!isEmailVerified
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                                    }`}
                            >
                                {!isEmailVerified ? (
                                    <>
                                        <i className="fas fa-envelope mr-2"></i>
                                        Verify Email to Continue
                                    </>
                                ) : (
                                    <>
                                        Next Step
                                        <i className="fas fa-arrow-right ml-2"></i>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Income & Security</h2>

                            <div>
                                <label className="form-label">Monthly Income (₹) *</label>
                                <input
                                    type="number"
                                    name="monthlyIncome"
                                    value={formData.monthlyIncome}
                                    onChange={handleChange}
                                    className={`form-input ${errors.monthlyIncome ? 'border-red-500' : ''}`}
                                    placeholder="Enter your gross monthly income"
                                />
                                {errors.monthlyIncome && <p className="text-red-500 text-sm mt-1">{errors.monthlyIncome}</p>}
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className="btn-secondary py-2 px-4 rounded-md text-lg font-semibold transition-colors duration-200"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i> Previous
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary py-2 px-4 rounded-md text-lg font-semibold transition-colors duration-200"
                                >
                                    Register <i className="fas fa-check-circle ml-2"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
