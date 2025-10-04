// Quick test to verify Firebase Auth configuration
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

console.log('🔍 Testing Firebase Auth Configuration...');
console.log('Auth object:', auth);
console.log('Auth app:', auth.app);
console.log('Auth config:', auth.app.options);

// Test function to verify auth is properly configured
export const testFirebaseAuth = async (email, password) => {
    try {
        console.log('🧪 Testing Firebase authentication...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Authentication successful:', userCredential.user.email);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('❌ Authentication failed:', error.code, error.message);
        return { success: false, error: error };
    }
};

// Export for testing
export default testFirebaseAuth;
