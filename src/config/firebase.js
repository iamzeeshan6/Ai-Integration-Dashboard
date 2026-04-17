import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBYpD365j3a8wwAOtc7j-tC7NP0kJ9SWfU",
//   authDomain: "pipedrive-landing.firebaseapp.com",
//   projectId: "pipedrive-landing",
//   storageBucket: "pipedrive-landing.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "your-app-id"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBYpD365j3a8wwAOtc7j-tC7NP0kJ9SWfU",
  authDomain: "pipedrive-landing.firebaseapp.com",
  projectId: "pipedrive-landing",
  storageBucket: "pipedrive-landing.firebasestorage.app",
  messagingSenderId: "316887420352",
  appId: "1:316887420352:web:05093dd8cb1bf343d5cc25",
  measurementId: "G-XY98476YDY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
