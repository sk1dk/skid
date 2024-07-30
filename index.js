document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('cashout-button').addEventListener('click', cashOut);

const gridSize = 5;
let multiplier = 1;
let betAmount = 0;
let difficulty = 'easy';
let grid = [];

function startGame() {
    betAmount = parseFloat(document.getElementById('bet-amount').value);
    difficulty = document.getElementById('difficulty').value;
    initializeGrid();
}

function initializeGrid() {
    grid = [];
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', onCellClick);
        gridElement.appendChild(cell);
        grid.push(cell);
    }
    placeVehicles();
}

function placeVehicles() {
    const vehicleCount = getVehicleCount();
    for (let i = 0; i < vehicleCount; i++) {
        const index = Math.floor(Math.random() * gridSize * gridSize);
        grid[index].classList.add('vehicle');
    }
}

function getVehicleCount() {
    switch (difficulty) {
        case 'easy': return Math.floor(gridSize * 0.1);
        case 'medium': return Math.floor(gridSize * 0.2);
        case 'hard': return Math.floor(gridSize * 0.3);
        case 'daredevil': return Math.floor(gridSize * 0.4);
        default: return Math.floor(gridSize * 0.1);
    }
}

function onCellClick(event) {
    const index = parseInt(event.target.dataset.index, 10);
    if (grid[index].classList.contains('vehicle')) {
        alert('Game Over! You hit a vehicle.');
    } else {
        multiplier += 1;
        event.target.style.backgroundColor = '#fff';
    }
}

function cashOut() {
    alert(`You cashed out with a multiplier of ${multiplier}. Total winnings: ${betAmount * multiplier}`);
    resetGame();
}

function resetGame() {
    multiplier = 1;
    betAmount = 0;
    document.getElementById('bet-amount').value = '';
    initializeGrid();
}