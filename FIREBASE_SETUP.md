# Firebase Authentication Setup

## 🔥 Firebase Configuration

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name: "AI Retirement Planner"
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

### Step 3: Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) to add web app
4. Register app with name: "AI Retirement Planner Web"
5. Copy the Firebase configuration object

### Step 4: Update firebaseConfig.js
Replace the placeholder values in `src/firebaseConfig.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 🚀 Features Implemented

### Registration Page
- ✅ **Email Verification Required**: Users must verify email before proceeding
- ✅ **Real Firebase Authentication**: Creates actual user accounts
- ✅ **Email Verification**: Sends verification link to user's email
- ✅ **Disabled Next Button**: Cannot proceed until email is verified
- ✅ **Status Messages**: Shows verification status and instructions

### Login Page
- ✅ **Firebase Authentication**: Real login with Firebase
- ✅ **Error Handling**: Proper error messages for different scenarios
- ✅ **Form Validation**: Client-side validation

### Security Features
- ✅ **Email Verification**: Prevents fake email registrations
- ✅ **Password Requirements**: Firebase enforces minimum password strength
- ✅ **Account Protection**: Prevents duplicate email registrations

## 📧 Email Verification Flow

1. **User fills registration form** (Step 1)
2. **Clicks "Create & Verify" button**
3. **Firebase creates account** and sends verification email
4. **User receives email** with verification link
5. **User clicks link** in email to verify
6. **App detects verification** and enables "Next Step" button
7. **User can proceed** to Step 2 (Income & Security)

## 🔧 Testing

1. **Start the app**: `npm start`
2. **Go to registration page**
3. **Fill in email and password**
4. **Click "Create & Verify"**
5. **Check your email** for verification link
6. **Click the link** in the email
7. **Return to app** - "Next Step" button should be enabled

## 🛠️ Troubleshooting

### Common Issues:
- **"Firebase config not found"**: Make sure to update `firebaseConfig.js` with your actual config
- **"Email not verified"**: Check spam folder, or try resending verification
- **"Account already exists"**: Use login page instead, or use different email

### Development Tips:
- Use a real email address for testing
- Check browser console for error messages
- Ensure Firebase project has Authentication enabled
- Make sure email/password provider is enabled in Firebase Console
