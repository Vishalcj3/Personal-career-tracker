import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-sLfrZriSiZtDar-qMY2Dq5nR5lTXgY0",
  authDomain: "personal-career-navigator.firebaseapp.com",
  projectId: "personal-career-navigator",
  storageBucket: "personal-career-navigator.firebasestorage.app",
  messagingSenderId: "197730946706",
  appId: "1:197730946706:web:d0119e18c081f32bcc604b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);