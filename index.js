document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("flowerCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 400;

    let growth = 0;

    function drawFlower() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 5;
        ctx.moveTo(canvas.width / 2, canvas.height);
        ctx.lineTo(canvas.width / 2, canvas.height - growth);
        ctx.stroke();

        const petalColors = ['#FF69B4', '#FFB6C1'];
        const petalRadius = 20;
        const petalCount = 5;
        const centerX = canvas.width / 2;
        const centerY = canvas.height - growth;
        const angleIncrement = (2 * Math.PI) / petalCount;

        for (let i = 0; i < petalCount; i++) {
            const angle = i * angleIncrement;
            const x = centerX + Math.cos(angle) * petalRadius;
            const y = centerY + Math.sin(angle) * petalRadius;

            ctx.beginPath();
            ctx.arc(x, y, petalRadius, 0, 2 * Math.PI);
            ctx.fillStyle = petalColors[i % petalColors.length];
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    function animate() {
        if (growth < canvas.height - 50) {
            growth += 2;
            drawFlower();
            requestAnimationFrame(animate);
        }
    }

    animate();
});
