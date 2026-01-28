import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const logContainer = document.querySelector('#log-container');
const aiStatus = document.querySelector('#ai-status');
const scanBtn = document.querySelector('#start-scan');

// Security: Kick out unauthorized users
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.querySelector('#user-email').innerText = `OP: ${user.email}`;
    } else {
        window.location.href = "login.html";
    }
});

// AI Intelligence Log Generator
const logMessages = [
    "Analyzing packet headers...",
    "Scanning perimeter network...",
    "Neural link established...",
    "Threat detected: Unauthorized API ping",
    "Mitigating spoofing attempt...",
    "Active Intelligence: 99.4% accuracy",
    "Bypassing secure firewall layer...",
    "Database handshake verified.",
    "Alert: Anomalous behavior in Zone 4"
];

function addLog() {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerText = `> ${logMessages[Math.floor(Math.random() * logMessages.length)]}`;
    logContainer.prepend(entry); // Keeps newest logs at the top
}

// Start AI Scanning
scanBtn.addEventListener('click', () => {
    aiStatus.innerText = "ACTIVE INTELLIGENCE: SCANNING";
    aiStatus.style.color = "#00d2ff";
    scanBtn.style.display = "none";
    setInterval(addLog, 2000); // Adds a new AI log every 2 seconds
});

// Logout Logic
document.querySelector('#signout-btn').addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "index.html");
});
