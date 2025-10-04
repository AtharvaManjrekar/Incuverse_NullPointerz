import { db } from "../firebaseConfig";
import { collection, addDoc, setDoc, doc, getDoc, getDocs } from "firebase/firestore";

export const addData = async (collectionName, data) => {
    try {
        console.log("Adding data to Firestore:", data);
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Firestore error:", error);
        return { success: false, error: error.message };
    }
};

export const setData = async (collectionName, docId, data) => {
    try {
        await setDoc(doc(db, collectionName, docId), data);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getData = async (collectionName, docId) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) return { success: true, data: docSnap.data() };
        else return { success: false, error: "No such document!" };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getAllData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const result = [];
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Check if user exists in database by email
export const checkUserExists = async (email) => {
    try {
        console.log('🔍 Firestore checkUserExists called with email:', email);
        console.log('🔍 Firestore db object:', db);

        // Try to get all documents from users collection
        const usersCollection = collection(db, 'users');
        console.log('🔍 Users collection reference:', usersCollection);

        const querySnapshot = await getDocs(usersCollection);
        console.log('🔍 Query snapshot size:', querySnapshot.size);
        console.log('🔍 Query snapshot empty:', querySnapshot.empty);

        const users = [];
        querySnapshot.forEach((doc) => {
            const userData = { id: doc.id, ...doc.data() };
            console.log('🔍 Found user in database:', userData);
            console.log('🔍 User email from DB:', userData.email);
            console.log('🔍 Searching for email:', email);
            console.log('🔍 Email match:', userData.email === email);
            users.push(userData);
        });

        console.log('🔍 All users in database:', users);
        console.log('🔍 Total users found:', users.length);

        // Find user by email (case-insensitive)
        const user = users.find(user =>
            user.email && user.email.toLowerCase() === email.toLowerCase()
        );
        console.log('🔍 User found by email:', user);

        if (user) {
            console.log('✅ User found in database!');
            return { success: true, exists: true, user: user };
        } else {
            console.log('❌ User not found in database');
            return { success: true, exists: false };
        }
    } catch (error) {
        console.error("❌ Error checking user existence:", error);
        console.error("❌ Error details:", {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
        return { success: false, error: error.message };
    }
};

// Test function to check Firestore connection
export const testFirestoreConnection = async () => {
    try {
        console.log('Testing Firestore connection...');
        const testData = {
            test: true,
            timestamp: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, 'test'), testData);
        console.log('Test document created with ID:', docRef.id);

        return { success: true, docId: docRef.id };
    } catch (error) {
        console.error('Firestore connection test failed:', error);
        return { success: false, error: error.message };
    }
};

// Function to verify user data in database
export const verifyUserData = async (email) => {
    try {
        console.log('🔍 Verifying user data for email:', email);

        const querySnapshot = await getDocs(collection(db, 'users'));
        console.log('🔍 Total documents in users collection:', querySnapshot.size);

        const users = [];
        querySnapshot.forEach((doc) => {
            const userData = { id: doc.id, ...doc.data() };
            users.push(userData);
            console.log('🔍 User document ID:', doc.id);
            console.log('🔍 User data:', userData);
            console.log('🔍 User email field:', userData.email);
            console.log('🔍 User email type:', typeof userData.email);
            console.log('🔍 User email length:', userData.email ? userData.email.length : 'null');
        });

        // Find user by email
        const user = users.find(user =>
            user.email && user.email.toLowerCase() === email.toLowerCase()
        );

        if (user) {
            console.log('✅ User data verified:', user);
            return { success: true, user: user };
        } else {
            console.log('❌ User data not found');
            console.log('❌ Available emails:', users.map(u => u.email));
            return { success: false, error: 'User not found' };
        }
    } catch (error) {
        console.error('❌ Error verifying user data:', error);
        return { success: false, error: error.message };
    }
};