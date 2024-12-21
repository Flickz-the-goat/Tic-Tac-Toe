// Game state variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let player1Name = '';
let player2Name = '';

// DOM elements
const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const cells = document.querySelectorAll('.cell');
const player1Display = document.querySelector('.players h2:first-child');
const player2Display = document.querySelector('.players h2:last-child');

// Show modal when page loads
window.addEventListener('DOMContentLoaded', () => {
    modal.showModal();
});

// Handle form submission
form.addEventListener('submit', (e) => {
    player1Name = document.querySelector('#player1').value;
    player2Name = document.querySelector('#player2').value;
    
    // Update player display
    player1Display.textContent = `${player1Name}: X`;
    player2Display.textContent = `${player2Name}: O`;
    
    gameActive = true;
});

// Handle cell clicks
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameActive && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if(checkWin()) {
                alert(`${currentPlayer === 'X' ? player1Name : player2Name} wins!`);
                gameActive = false;
                resetGame();
            }
            else if(checkDraw()) {
                alert('Draw!');
                gameActive = false;
                resetGame();
            }
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '') {
            return true;
        }
    }
    
    return false;
}
resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    gameActive = true;
}
checkDraw = () => {
    return gameBoard.every(cell => cell !== '');
}