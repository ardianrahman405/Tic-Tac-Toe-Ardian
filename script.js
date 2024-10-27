const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    board.innerHTML = '';
    boardState.fill('');
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-cell-index');

    if (boardState[index] !== '' || !gameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Pemain ${currentPlayer} menang!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        message.textContent = 'Permainan seri!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

restartButton.addEventListener('click', createBoard);
createBoard();
