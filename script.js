const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dinoImg = new Image();
dinoImg.src = 'https://zuraai.lol/IMG_5747.png';

let dino = {
    x: 50,
    y: 150,
    width: 40,
    height: 40,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    grounded: true
};

let obstacles = [];
let frame = 0;
let score = 0;

function drawDino() {
    ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
}

function updateDino() {
    dino.dy += dino.gravity;
    dino.y += dino.dy;
    if (dino.y + dino.height >= canvas.height) {
        dino.y = canvas.height - dino.height;
        dino.dy = 0;
        dino.grounded = true;
    }
}

function handleJump() {
    if (dino.grounded) {
        dino.dy = dino.jumpPower;
        dino.grounded = false;
    }
}

function createObstacle() {
    let obstacle = {
        x: canvas.width,
        y: canvas.height - 30,
        width: 20,
        height: 30
    };
    obstacles.push(obstacle);
}

function drawObstacles() {
    ctx.fillStyle = '#000';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= 5;
    });

    if (obstacles.length > 0 && obstacles[0].x < -obstacles[0].width) {
        obstacles.shift();
        score++;
    }

    if (frame % 120 === 0) {
        createObstacle();
    }
}

function detectCollision() {
    obstacles.forEach(obstacle => {
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
            alert('Game Over! Score: ' + score);
            document.location.reload();
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    updateDino();
    drawObstacles();
    updateObstacles();
    detectCollision();

    frame++;
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        handleJump();
    }
});

dinoImg.onload = function() {
    gameLoop();
};