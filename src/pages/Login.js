import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      // Simulate login process
      setTimeout(() => {
        console.log('Login attempt:', formData);
        setIsLoading(false);
        // Simulate successful login
        alert('Login successful! Welcome to AI Retirement Planner');
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
      <div className="card w-full p-6 shadow-lg border rounded-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-sign-in-alt text-primary-600 text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your AI Retirement Planner account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label">Email Address</label>
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
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4 text-center border rounded-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-shield-alt text-primary-600"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure Login</h3>
            <p className="text-sm text-gray-600">Bank-level encryption</p>
          </div>

          <div className="card p-4 text-center border rounded-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-mobile-alt text-primary-600"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Mobile Access</h3>
            <p className="text-sm text-gray-600">Access anywhere</p>
          </div>

          <div className="card p-4 text-center border rounded-lg">
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
