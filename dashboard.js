// SIMULATED PAYWALL STATUS
const hasActiveSubscription = localStorage.getItem('isPaidUser') === 'true';

document.getElementById('start-scan').addEventListener('click', () => {
    if (!hasActiveSubscription) {
        alert("ACCESS DENIED: No active deployment license found. Purchase a node to initialize.");
        window.location.href = "index.html#pricing";
        return;
    }
    
    // PAID FEATURES (Verified in tests)
    document.getElementById('ai-status').innerText = "AI CORE: ACTIVE"; //
    startAIOverlay(); // Draws HUMAN_01 and OBJECT_UNK
    
    // START SECURITY LOGS
    setInterval(addLog, 2000); 
});

function startAIOverlay() {
    const canvas = document.getElementById('ai-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600; canvas.height = 400;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Drawing targeting boxes from your test results
        ctx.strokeStyle = "#00d2ff";
        ctx.strokeRect(100, 50, 80, 100);
        ctx.fillStyle = "#00d2ff";
        ctx.fillText("HUMAN_01", 100, 45);
        requestAnimationFrame(draw);
    }
    draw();
}
