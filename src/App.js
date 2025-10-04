import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RetirementPlanning from './pages/RetirementPlanning';
import Results from './pages/Results';

// Import your publishable key
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// For development, use a placeholder if no key is provided
if (!clerkPubKey) {
  console.warn("Missing Clerk Publishable Key - using placeholder for development");
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey || "pk_test_placeholder"}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/planning"
              element={
                <>
                  <SignedIn>
                    <RetirementPlanning />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/results"
              element={
                <>
                  <SignedIn>
                    <Results />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
