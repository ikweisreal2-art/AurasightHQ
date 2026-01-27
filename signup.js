import { auth, db, doc } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("signup-btn").onclick = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || password.length < 6) {
        alert("CRITICAL: Email required and Passcode must be at least 6 characters.");
        return;
    }

    try {
        // 1. Create the Secure Operator Account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Initialize the Billion-Dollar Clearance (7-Day Trial)
        // This tells the dashboard to show "7-DAY TRIAL" status
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            tier: "7-DAY TRIAL",
            cameras: [], // Empty grid ready for AI ingestion
            createdAt: new Date().toISOString()
        });

        alert("TRIAL ACTIVATED: Welcome to AuraSightHQ.");
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Signup Error:", error.message);
        alert("ACCESS DENIED: " + error.message);
    }
};
