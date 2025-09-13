import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Using your provided Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW9IxjsPg5Q2Guyl3ibAseJ6GFHtEVYhY",
  authDomain: "tradingschool-fe06d.firebaseapp.com",
  projectId: "tradingschool-fe06d",
  storageBucket: "tradingschool-fe06d.firebasestorage.app",
  messagingSenderId: "750428377169",
  appId: "1:750428377169:web:f1135fd23f9cefc198a870",
  measurementId: "G-HWQ0KJRGLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
