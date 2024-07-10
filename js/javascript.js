document.addEventListener('DOMContentLoaded', () => {
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    let oTurn;
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.querySelector('.board');
    const restartButton = document.getElementById('restartButton');
    const messageElement = document.getElementById('message');

    startGame();

    restartButton.addEventListener('click', startGame);

    function startGame() {
        oTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setMessage("Player 1's turn (X)");
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = oTurn ? O_CLASS : X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setMessage(`Player ${oTurn ? "2" : "1"}'s turn (${oTurn ? "O" : "X"})`);
        }
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        oTurn = !oTurn;
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    }

    function endGame(draw) {
        if (draw) {
            setMessage("Draw!");
        } else {
            setMessage(`Player ${oTurn ? "2" : "1"} (${oTurn ? "O" : "X"}) Wins!`);
        }
    }

    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        });
    }

    function setMessage(message) {
        messageElement.textContent = message;
    }
});
