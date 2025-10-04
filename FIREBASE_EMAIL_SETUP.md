# Firebase Email Verification Setup Guide

## 🔧 Configure Email Verification in Firebase Console

### Step 1: Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **retireease-a1cba**

### Step 2: Configure Authentication
1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domain: `localhost:3002` (for development)
3. Add your production domain when you deploy

### Step 3: Configure Email Templates
1. Go to **Authentication** → **Templates**
2. Click on **Email address verification**
3. Customize the email template:
   - **Subject**: "Verify your email for AI Retirement Planner"
   - **Body**: Add your app name and branding
   - **Action URL**: Should point to your app

### Step 4: Configure SMTP (Optional but Recommended)
1. Go to **Authentication** → **Settings** → **SMTP settings**
2. Configure your own SMTP server for better deliverability
3. Or use Firebase's default email service

### Step 5: Test Email Verification
1. Use a real email address (not temporary emails)
2. Check spam folder if email doesn't arrive
3. Use the "Resend Email" button if needed

## 🚨 Common Issues & Solutions

### Issue 1: "Failed to send verification email"
**Solution**: 
- Check Firebase Console → Authentication → Users
- Make sure the user is created successfully
- Check browser console for specific error codes

### Issue 2: Email goes to spam
**Solution**:
- Configure custom SMTP
- Add SPF/DKIM records for your domain
- Use a professional email service

### Issue 3: "Too many requests" error
**Solution**:
- Wait 1-2 minutes before trying again
- Firebase has rate limits for email sending
- Use the "Resend Email" button instead of creating new accounts

## 🔍 Debugging Steps

1. **Check Firebase Console**:
   - Go to Authentication → Users
   - Verify user is created
   - Check if email is verified

2. **Check Browser Console**:
   - Look for specific error codes
   - Check network tab for failed requests

3. **Test with Different Email**:
   - Try with Gmail, Yahoo, etc.
   - Avoid temporary email services

## 📧 Email Template Customization

In Firebase Console → Authentication → Templates:

```
Subject: Verify your email for AI Retirement Planner

Hello,

Please verify your email address to complete your registration for AI Retirement Planner.

Click the link below to verify:
[Verification Link]

If you didn't create an account, please ignore this email.

Best regards,
AI Retirement Planner Team
```

## ✅ Testing Checklist

- [ ] User can register successfully
- [ ] Verification email is sent
- [ ] Email arrives in inbox (not spam)
- [ ] Clicking verification link works
- [ ] User can proceed to next step after verification
- [ ] "Resend Email" button works
- [ ] "Check Verification" button works

## 🚀 Production Deployment

When deploying to production:

1. Add your production domain to authorized domains
2. Update email templates with production URLs
3. Configure proper SMTP settings
4. Test with real email addresses
5. Monitor email delivery rates

---

**Note**: Email verification is important for security and user experience. Make sure to test thoroughly before going live!
