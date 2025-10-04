import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { checkUserExists, verifyUserData, testFirestoreConnection } from './firestore';

const Diagnostic = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runDiagnostic = async () => {
    setLoading(true);
    const diagnosticResults = {};

    try {
      // Test 1: Firebase Configuration
      console.log('🔍 Test 1: Firebase Configuration');
      diagnosticResults.firebaseConfig = {
        success: true,
        message: 'Firebase config loaded',
        db: db ? 'Available' : 'Not available'
      };

      // Test 2: Firestore Connection
      console.log('🔍 Test 2: Firestore Connection');
      try {
        const firestoreTest = await testFirestoreConnection();
        diagnosticResults.firestoreConnection = {
          success: firestoreTest.success,
          message: firestoreTest.success ? 'Firestore connected' : 'Firestore failed',
          error: firestoreTest.error
        };
      } catch (error) {
        diagnosticResults.firestoreConnection = {
          success: false,
          message: 'Firestore connection failed',
          error: error.message
        };
      }

      // Test 3: Read Users Collection
      console.log('🔍 Test 3: Read Users Collection');
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        
        diagnosticResults.readUsers = {
          success: true,
          message: `Found ${users.length} users`,
          users: users,
          count: querySnapshot.size
        };
      } catch (error) {
        diagnosticResults.readUsers = {
          success: false,
          message: 'Failed to read users',
          error: error.message
        };
      }

      // Test 4: Write Test Document
      console.log('🔍 Test 4: Write Test Document');
      try {
        const testData = {
          test: true,
          timestamp: new Date().toISOString(),
          diagnostic: true
        };
        const docRef = await addDoc(collection(db, 'test'), testData);
        diagnosticResults.writeTest = {
          success: true,
          message: 'Test document written successfully',
          docId: docRef.id
        };
      } catch (error) {
        diagnosticResults.writeTest = {
          success: false,
          message: 'Failed to write test document',
          error: error.message
        };
      }

      // Test 5: User Check Function
      console.log('🔍 Test 5: User Check Function');
      try {
        const userCheck = await checkUserExists('test@example.com');
        diagnosticResults.userCheck = {
          success: userCheck.success,
          message: userCheck.success ? 'User check function working' : 'User check function failed',
          exists: userCheck.exists,
          error: userCheck.error
        };
      } catch (error) {
        diagnosticResults.userCheck = {
          success: false,
          message: 'User check function failed',
          error: error.message
        };
      }

      // Test 6: User Verify Function
      console.log('🔍 Test 6: User Verify Function');
      try {
        const userVerify = await verifyUserData('test@example.com');
        diagnosticResults.userVerify = {
          success: userVerify.success,
          message: userVerify.success ? 'User verify function working' : 'User verify function failed',
          error: userVerify.error
        };
      } catch (error) {
        diagnosticResults.userVerify = {
          success: false,
          message: 'User verify function failed',
          error: error.message
        };
      }

    } catch (error) {
      console.error('❌ Diagnostic failed:', error);
      diagnosticResults.general = {
        success: false,
        message: 'Diagnostic failed',
        error: error.message
      };
    }

    setResults(diagnosticResults);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Diagnostic Tool</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Run Complete Diagnostic</h2>
        <p className="text-gray-600 mb-4">
          This will test all aspects of your Firebase/Firestore connection and database operations.
        </p>
        
        <button
          onClick={runDiagnostic}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Running Diagnostic...' : 'Run Diagnostic'}
        </button>
      </div>
      
      {Object.keys(results).length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Diagnostic Results</h2>
          
          {Object.entries(results).map(([testName, result]) => (
            <div key={testName} className="mb-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold capitalize">{testName.replace(/([A-Z])/g, ' $1')}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {result.success ? 'PASS' : 'FAIL'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-2">{result.message}</p>
              
              {result.error && (
                <p className="text-red-600 text-sm">Error: {result.error}</p>
              )}
              
              {result.users && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Users found:</p>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(result.users, null, 2)}
                  </pre>
                </div>
              )}
              
              {result.count !== undefined && (
                <p className="text-sm text-gray-600">Count: {result.count}</p>
              )}
              
              {result.docId && (
                <p className="text-sm text-gray-600">Document ID: {result.docId}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Diagnostic;
