import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    const btn = document.querySelector('#login-btn');

    btn.innerText = "VERIFYING CREDENTIALS...";
    btn.style.opacity = "0.7";

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Access Granted");
            window.location.href = "dashboard.html"; // Redirects to your AI dashboard
        })
        .catch((error) => {
            btn.innerText = "ACCESS AI CORE";
            btn.style.opacity = "1";
            alert("Access Denied: " + error.message);
        });
});
