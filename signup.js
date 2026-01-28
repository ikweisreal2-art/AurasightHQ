import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    const btn = document.querySelector('#deploy-btn');

    // Visual feedback for the "Billion-Dollar" brand
    btn.innerText = "INITIALIZING CORE...";
    btn.style.opacity = "0.7";

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("AuraSight Operator Created");
            window.location.href = "dashboard.html"; // Takes user to the active intelligence logs
        })
        .catch((error) => {
            btn.innerText = "DEPLOY TRIAL SYSTEM";
            btn.style.opacity = "1";
            alert("Security Breach Detected: " + error.message);
        });
});
