import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyACovit-WlcCie6V8uPAikTfb5ox4e9hJo",
  authDomain: "soulmatch-95bd5.firebaseapp.com",
  projectId: "soulmatch-95bd5",
  storageBucket: "soulmatch-95bd5.appspot.com",
  messagingSenderId: "681797014111",
  appId: "1:681797014111:web:ef36cd3855676bfb4581ea",
  measurementId: "G-G2ZZ4FRGDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
