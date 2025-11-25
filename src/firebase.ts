// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCP8DUY4NVQQ4w3O-sCWrEm4QVzd_nc1Dc",
  authDomain: "portfolio-saran-alexandru.firebaseapp.com",
  projectId: "portfolio-saran-alexandru",
  storageBucket: "portfolio-saran-alexandru.firebasestorage.app",
  messagingSenderId: "817687955044",
  appId: "1:817687955044:web:a1dbccb0ffb23b3abf4171",
  measurementId: "G-RML2FCTZEM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics doar dacă browserul îl suportă (evit erori în anumite medii)
isSupported().then((yes) => {
  if (yes) {
    getAnalytics(app);
  }
});

export { app };
