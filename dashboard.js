// SIMULATED PAYWALL CHECK
const hasActiveSubscription = localStorage.getItem('isPaidUser') === 'true';

document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('initialize-link');
    const statusText = document.getElementById('ai-status');

    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            if (!hasActiveSubscription) {
                // Blocks unauthorized access
                alert("ACCESS DENIED: No active deployment license found. Redirecting to Secure Billing...");
                window.location.href = "index.html#pricing";
                return;
            }
            
            // IF PAID: Activate Elite Features
            statusText.innerText = "AI CORE: ACTIVE";
            statusText.style.color = "#00ff88"; // Success Green
            startNeuralScanning();
        });
    }
});

function startNeuralScanning() {
    const canvas = document.getElementById('ai-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Logic to replicate targeting boxes from your tests
    function drawTargets() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Target: HUMAN_01
        ctx.strokeStyle = "#00d2ff";
        ctx.lineWidth = 2;
        ctx.strokeRect(120, 80, 150, 200);
        ctx.fillStyle = "#00d2ff";
        ctx.font = "bold 12px Space Grotesk";
        ctx.fillText("HUMAN_01", 120, 75);

        // Target: OBJECT_UNK
        ctx.strokeRect(400, 150, 100, 80);
        ctx.fillText("OBJECT_UNK", 400, 145);

        requestAnimationFrame(drawTargets);
    }
    drawTargets();
}
