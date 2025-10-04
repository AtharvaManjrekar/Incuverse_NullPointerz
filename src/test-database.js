// Simple test script to check database connection
// Run this in browser console to test

import { db } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const testDatabase = async () => {
    try {
        console.log('Testing Firestore connection...');

        // Test 1: Try to read from users collection
        console.log('Test 1: Reading users collection...');
        const usersSnapshot = await getDocs(collection(db, 'users'));
        console.log('Users collection size:', usersSnapshot.size);

        const users = [];
        usersSnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        console.log('All users:', users);

        // Test 2: Try to write a test document
        console.log('Test 2: Writing test document...');
        const testDoc = await addDoc(collection(db, 'test'), {
            test: true,
            timestamp: new Date().toISOString()
        });
        console.log('Test document created with ID:', testDoc.id);

        return {
            success: true,
            usersCount: usersSnapshot.size,
            testDocId: testDoc.id
        };
    } catch (error) {
        console.error('Database test failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Run the test
testDatabase().then(result => {
    console.log('Database test result:', result);
});
