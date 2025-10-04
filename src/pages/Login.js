import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
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

        <div className='flex justify-center'>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'btn btn-primary w-full',
                card: 'shadow-none border-0 w-full',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 flex items-center justify-center text-gray-700 font-medium',
                socialButtonsBlockButtonText: 'flex items-center text-sm font-medium',
                formFieldInput: 'form-input',
                footerActionLink: 'text-primary-600 hover:text-primary-700 font-medium',
                socialButtonsProviderIcon__google: 'w-5 h-5 mr-3',
                socialButtonsBlockButtonArrow: 'hidden',
                formFieldLabel: 'form-label',
                formFieldRow: 'mb-4',
                formFieldInputShowPasswordButton: 'text-gray-400 hover:text-gray-600',
                identityPreviewText: 'text-sm text-gray-600',
                formFieldSuccessText: 'text-green-600 text-sm',
                formFieldErrorText: 'text-red-500 text-sm',
                footerActionText: 'text-sm text-gray-600',
                footerActionLink: 'text-primary-600 hover:text-primary-700 font-medium text-sm'
              }
            }}
            redirectUrl="/dashboard"

          />
        </div>

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
