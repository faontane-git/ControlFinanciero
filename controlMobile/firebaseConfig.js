// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWkDKlLJK9ErmkdZ2JTbjhtpDe9JAEAxg",
  authDomain: "controlfinanciero-cdb8a.firebaseapp.com",
  projectId: "controlfinanciero-cdb8a",
  storageBucket: "controlfinanciero-cdb8a.firebasestorage.app",
  messagingSenderId: "1048283943973",
  appId: "1:1048283943973:web:86c6e5deaf6ac692101bcc",
  measurementId: "G-QT2W9QP91E"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore
export const db = getFirestore(app);
