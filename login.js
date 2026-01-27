import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- OPERATOR LOGIN LOGIC ---
document.getElementById("login-btn").onclick = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loader = document.getElementById("loader");

    if (!email || !password) {
        alert("CRITICAL: Operator credentials missing.");
        return;
    }

    try {
        // Show loading state for professional feel
        if(loader) loader.style.display = "block";
        
        // Attempt Secure Authentication
        await signInWithEmailAndPassword(auth, email, password);
        
        // Redirect to Command Center on success
        window.location.href = "dashboard.html";
    } catch (error) {
        // Billion-dollar brands use professional error handling
        if(loader) loader.style.display = "none";
        console.error("Auth Error:", error.code);
        
        let message = "ACCESS DENIED: Internal Authentication Error.";
        if (error.code === 'auth/invalid-credential') {
            message = "ACCESS DENIED: Invalid Operator Credentials.";
        } else if (error.code === 'auth/too-many-requests') {
            message = "SECURITY LOCK: Too many attempts. Try again later.";
        }
        
        alert(message);
    }
};
