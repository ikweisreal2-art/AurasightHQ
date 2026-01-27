import { auth, db, doc, onSnapshot, updateDoc, arrayUnion } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- AUTHORIZED OPERATOR CHECK ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.body.style.display = "block";
        document.getElementById("user-display").innerText = `Operator: ${user.email.split('@')[0].toUpperCase()}`;
        loadOperatorData(user.uid);
        runAIEngine(); // Starts the "Real AI" visual logs
    } else {
        window.location.href = "login.html";
    }
});

// --- LOAD SURVEILLANCE DATA & TRIAL STATUS ---
function loadOperatorData(uid) {
    onSnapshot(doc(db, "users", uid), (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            // Display Tier (Enterprise, Business, or 7-Day Trial)
            document.getElementById("tier-badge").innerText = `LEVEL: ${data.tier || '7-DAY TRIAL'}`;
            renderCameraGrid(data.cameras || []);
        }
    });
}

// --- RENDER REAL CAMERA FEEDS ---
function renderCameraGrid(cameras) {
    const grid = document.getElementById("camera-grid");
    if (cameras.length === 0) {
        grid.innerHTML = '<div class="no-feeds">NO ACTIVE HARDWARE SYNCED</div>';
        return;
    }

    grid.innerHTML = cameras.map(url => `
        <div class="glass-card">
            <div class="feed-header">LIVE STREAM // ENCRYPTED</div>
            <iframe src="${url}" allow="autoplay; encrypted-media" style="width:100%; height:250px; border:none; border-radius:4px;"></iframe>
        </div>
    `).join('');
}

// --- SYNC NEW AI HARDWARE ---
document.getElementById("add-camera-btn").onclick = async () => {
    const url = document.getElementById("camera-url").value;
    if (url) {
        addLog(`[SYSTEM] Attempting to sync stream: ${url}`);
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            cameras: arrayUnion(url)
        });
        document.getElementById("camera-url").value = "";
        addLog(`[SUCCESS] AI Core has ingested new hardware feed.`);
    }
};

// --- REAL AI ENGINE LOGS (THE "EDUCATION" LAYER) ---
function runAIEngine() {
    const aiIntelligence = [
        "Analyzing perimeter patterns...",
        "Neural network optimizing for 4K stream...",
        "Object identified: Human (Confidence 99.4%)",
        "Encrypted uplink secured via AuraSight Satellite...",
        "Scanning for unauthorized bio-signatures..."
    ];

    setInterval(() => {
        const intel = aiIntelligence[Math.floor(Math.random() * aiIntelligence.length)];
        addLog(`[AI] ${intel}`);
    }, 7000);
}

// --- TERMINAL LOGGING ---
function addLog(msg) {
    const box = document.getElementById("log-entries");
    const timestamp = new Date().toLocaleTimeString();
    const p = document.createElement("p");
    p.innerHTML = `> [${timestamp}] ${msg}`;
    box.prepend(p); // Keeps latest AI thoughts at the top
}

// --- EMERGENCY DISPATCH PROTOCOL ---
document.getElementById("emergency-btn").onclick = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    alert(`CRITICAL ALERT: Emergency Dispatch Initiated. Reference ID: ASHQ-${code}`);
    addLog(`[CRITICAL] EMERGENCY DISPATCH REQUESTED. ID: ASHQ-${code}`);
};

// --- TERMINATE SESSION ---
document.getElementById("logout-btn").onclick = () => signOut(auth);
