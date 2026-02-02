const canvas = document.getElementById('ai-canvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('video');

function startAIOverlay() {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simulating 2 detected targets
        const time = Date.now() * 0.002;
        drawBox(50 + Math.sin(time) * 20, 100 + Math.cos(time) * 10, 80, 120, "HUMAN_01");
        drawBox(200 + Math.cos(time) * 30, 150 + Math.sin(time) * 5, 60, 60, "OBJECT_UNK");

        requestAnimationFrame(draw);
    }
    draw();
}

function drawBox(x, y, w, h, label) {
    ctx.strokeStyle = "#00d2ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    // Draw corners
    ctx.fillStyle = "#00d2ff";
    ctx.fillRect(x-2, y-2, 10, 2); ctx.fillRect(x-2, y-2, 2, 10);
    // Label
    ctx.font = "10px monospace";
    ctx.fillText(label, x, y - 5);
}

document.getElementById('start-scan').addEventListener('click', () => {
    startAIOverlay();
    document.getElementById('ai-status').innerText = "AI CORE: ACTIVE";
});
