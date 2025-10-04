import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { checkUserExists, verifyUserData } from './firestore';

const DebugDatabase = () => {
    const [email, setEmail] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const testDatabase = async () => {
        setLoading(true);
        try {
            console.log('🔍 Testing database...');

            // Test 1: Get all users
            const querySnapshot = await getDocs(collection(db, 'users'));
            console.log('🔍 Total users:', querySnapshot.size);

            const users = [];
            querySnapshot.forEach((doc) => {
                const userData = { id: doc.id, ...doc.data() };
                users.push(userData);
                console.log('🔍 User:', userData);
            });

            // Test 2: Check specific email
            let userCheck = null;
            if (email) {
                userCheck = await checkUserExists(email);
                console.log('🔍 User check result:', userCheck);
            }

            // Test 3: Verify user data
            let userVerify = null;
            if (email) {
                userVerify = await verifyUserData(email);
                console.log('🔍 User verify result:', userVerify);
            }

            setResults({
                totalUsers: querySnapshot.size,
                users: users,
                userCheck: userCheck,
                userVerify: userVerify
            });

        } catch (error) {
            console.error('❌ Database test failed:', error);
            setResults({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Debug Tool</h1>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Test Database Connection</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email to test (optional):
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email to test"
                    />
                </div>

                <button
                    onClick={testDatabase}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Testing...' : 'Test Database'}
                </button>
            </div>

            {results && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Test Results</h2>

                    {results.error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <strong>Error:</strong> {results.error}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <strong>Total Users in Database:</strong> {results.totalUsers}
                            </div>

                            <div>
                                <strong>All Users:</strong>
                                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                                    {JSON.stringify(results.users, null, 2)}
                                </pre>
                            </div>

                            {results.userCheck && (
                                <div>
                                    <strong>User Check Result:</strong>
                                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                                        {JSON.stringify(results.userCheck, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {results.userVerify && (
                                <div>
                                    <strong>User Verify Result:</strong>
                                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                                        {JSON.stringify(results.userVerify, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DebugDatabase;
