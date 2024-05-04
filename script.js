document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let currentPlayer = 'X';
    const cells = Array.from({ length: 9 });

    cells.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', () => handleCellClick(cell));
        board.appendChild(cell);
    });

    function handleCellClick(cell) {
        if (cell.textContent !== '' || checkWinner()) return;

        const index = parseInt(cell.dataset.index);
        cells[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                alert(`Player ${winner} wins!`);
                resetGame();
            }, 100);
        } else if (cells.every(cell => cell !== undefined)) {
            setTimeout(() => {
                alert("It's a tie!");
                resetGame();
            }, 100);
        }
    }

    function checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
            }
        }

        return null;
    }

    function resetGame() {
        cells.fill(undefined);
        board.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
    }
});
