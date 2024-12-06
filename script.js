// script.js

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle player's move
function makeMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    updateCell(index);

    if (checkWinner()) {
        displayMessage(`Player ${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        displayMessage("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (currentPlayer === "O") {
        displayMessage("Computer's Turn...");
        setTimeout(computerMove, 500);
    } else {
        displayMessage(`Player ${currentPlayer}'s Turn`);
    }
}

// Update the cell in the UI
function updateCell(index) {
    const cells = document.querySelectorAll(".cell");
    cells[index].textContent = currentPlayer;
    cells[index].classList.add("taken");
}

// Handle the computer's move
function computerMove() {
    const index = getBestMove();
    board[index] = currentPlayer;
    updateCell(index);

    if (checkWinner()) {
        displayMessage(`Player ${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        displayMessage("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = "X";
    displayMessage(`Player ${currentPlayer}'s Turn`);
}

// Get the best move for the computer
function getBestMove() {
    // Try to win
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === "O" && board[b] === "O" && board[c] === "") return c;
        if (board[a] === "O" && board[b] === "" && board[c] === "O") return b;
        if (board[a] === "" && board[b] === "O" && board[c] === "O") return a;
    }

    // Block the player
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === "X" && board[b] === "X" && board[c] === "") return c;
        if (board[a] === "X" && board[b] === "" && board[c] === "X") return b;
        if (board[a] === "" && board[b] === "X" && board[c] === "X") return a;
    }

    // Pick a random available cell
    const availableMoves = board.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Check if there's a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    displayMessage("Good Luck!");
}

// Display a message
function displayMessage(message) {
    document.getElementById("message").textContent = message;
}
