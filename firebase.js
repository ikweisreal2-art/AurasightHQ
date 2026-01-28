// AuraSightHQ Core Firebase Module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXWNn-iyP4M2eNmzHbTfBtiMJhciIbpWE",
    authDomain: "aurasighthq-178af.firebaseapp.com",
    projectId: "aurasighthq-178af",
    storageBucket: "aurasighthq-178af.firebasestorage.app",
    messagingSenderId: "726147910104",
    appId: "1:726147910104:web:b21a096ba4173d4cb78aad"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
