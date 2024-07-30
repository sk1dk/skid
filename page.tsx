import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const PlayPage = () => {
    useEffect(() => {
        const grid = document.getElementById('game-grid');
        const rows = 5;
        const cols = 5;
        const bombCount = 5;
        const cells = [];
        const bombImage = '/bomb.png';
        const diamondImage = '/diamond.png';

        // Initialize grid
        for (let i = 0; i < rows * cols; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'flex', 'items-center', 'justify-center', 'cursor-pointer');
            cell.dataset.index = i.toString();
            grid.appendChild(cell);
            cells.push(cell);
        }

        // Place bombs
        let bombPositions = new Set<number>();
        while (bombPositions.size < bombCount) {
            bombPositions.add(Math.floor(Math.random() * rows * cols));
        }

        // Handle cell click
        cells.forEach(cell => {
            cell.addEventListener('click', function handleClick() {
                const index = parseInt(cell.dataset.index);
                if (bombPositions.has(index)) {
                    cell.innerHTML = `<img src="${bombImage}" alt="Bomb">`;
                    cell.classList.add('bg-red-600');
                    // Game over logic here
                    alert('Game Over!');
                    revealBombs();
                } else {
                    cell.innerHTML = `<img src="${diamondImage}" alt="Diamond">`;
                    cell.classList.add('bg-green-600');
                }
                cell.removeEventListener('click', handleClick);
            });
        });

        // Reveal all bombs
        function revealBombs() {
            bombPositions.forEach(index => {
                const cell = cells[index];
                if (!cell.innerHTML) {
                    cell.innerHTML = `<img src="${bombImage}" alt="Bomb">`;
                    cell.classList.add('bg-red-600');
                }
            });
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold text-white mb-8">Mines Game</h1>
                <div id="game-grid" className="grid grid-cols-5 gap-2"></div>
            </div>
        </div>
    );
};

export default PlayPage;
