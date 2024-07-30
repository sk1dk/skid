document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    
    let dino, obstacles, score, gameInterval, isJumping;

    function startGame() {
        dino = {
            x: 50,
            y: 150,
            width: 20,
            height: 20,
            dy: 0,
            gravity: 0.5,
            jumpForce: -10,
            grounded: true
        };
        obstacles = [];
        score = 0;
        isJumping = false;
        
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 20);
    }

    function gameLoop() {
        update();
        draw();
    }

    function update() {
        score++;
        
        // Dino jumping logic
        if (isJumping && dino.grounded) {
            dino.dy = dino.jumpForce;
            dino.grounded = false;
        }
        dino.dy += dino.gravity;
        dino.y += dino.dy;
        if (dino.y > 150) {
            dino.y = 150;
            dino.dy = 0;
            dino.grounded = true;
        }
        
        // Obstacle logic
        if (Math.random() < 0.02) {
            obstacles.push({
                x: canvas.width,
                y: 150,
                width: 20,
                height: 20
            });
        }
        obstacles.forEach((obstacle, index) => {
            obstacle.x -= 5;
            if (obstacle.x + obstacle.width < 0) {
                obstacles.splice(index, 1);
            }
            
            // Collision detection
            if (dino.x < obstacle.x + obstacle.width &&
                dino.x + dino.width > obstacle.x &&
                dino.y < obstacle.y + obstacle.height &&
                dino.y + dino.height > obstacle.y) {
                clearInterval(gameInterval);
                alert('Game Over! Your score: ' + score);
            }
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw dino
        ctx.fillStyle = 'green';
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
        
        // Draw obstacles
        ctx.fillStyle = 'red';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
        
        // Draw score
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            isJumping = true;
        }
    });
    
    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            isJumping = false;
        }
    });

    startBtn.addEventListener('click', startGame);
});