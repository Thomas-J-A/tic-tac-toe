const gameBoard = (() => {
    let arr = ['', '', '', '', '', '', '', '', ''];

    function isFree(index) {
        return (arr[index] === '') ? true : false;
    }

    function updateArray(index, marker) {
        arr[index] = marker;
    }

    function resetArray() {
        for (let i = 0; i < 9; i++) {
            if (arr[i] !== '') arr[i] = '';
        }
    }

    function isThreeInARow(marker) {
        return checkRows(marker) || 
               checkColumns(marker) || 
               checkDiagonals(marker) 
    }

    function checkRows(marker) {
        if (arr[0] == marker && arr[1] == marker && arr[2] == marker) return true;
        if (arr[3] == marker && arr[4] == marker && arr[5] == marker) return true;
        if (arr[6] == marker && arr[7] == marker && arr[8] == marker) return true;
        return false;
    }

    function checkColumns(marker) {
        if (arr[0] == marker && arr[3] == marker && arr[6] == marker) return true;
        if (arr[1] == marker && arr[4] == marker && arr[7] == marker) return true;
        if (arr[2] == marker && arr[5] == marker && arr[8] == marker) return true;
        return false;
    }

    function checkDiagonals(marker) {
        if (arr[0] == marker && arr[4] == marker && arr[8] == marker) return true;
        if (arr[2] == marker && arr[4] == marker && arr[6] == marker) return true;
        return false;
    }

    function isTie() {
        for (let i = 0; i < 9; i++) {
            if (arr[i] === '') return false;
        }
        return true;
    }

    return {
        arr,
        isFree,
        isTie,
        isThreeInARow,
        updateArray,
        resetArray
    };
})();


const displayController = (() => {
    // local variables
    let whoseTurn = 'player1';

    // cache DOM
    const playerIcons = document.querySelectorAll('.player i');
    const squares = document.querySelectorAll('.square');
    const resetBtn = document.getElementById('reset-btn');
    const modal = document.getElementById('modal');
    const message = document.getElementById('message');

    // add event listeners
    squares.forEach(square => {
        square.addEventListener('click', updateBoard);
    });

    resetBtn.addEventListener('click', resetBoard);

    // event callbacks
    function updateBoard(e) {
        const index = e.target.getAttribute('data-index');
        if (!gameBoard.isFree(index)) return;
        const marker = (whoseTurn === 'player1') ? 'x' : 'o';
        gameBoard.updateArray(index, marker);
        render(gameBoard.arr);
        checkForGameOver(marker);
    }

    function checkForGameOver(marker){
        if (gameBoard.isThreeInARow(marker)) {
            displayModal(marker);
        } else if (gameBoard.isTie()) {
            displayModal();
        } else {
            toggleTurn();
        }
    }

    function displayModal(marker) {
        if (marker) {
            message.textContent = (marker === 'x') ? 'Player 1 wins!' : 'Player 2 wins!';
        } else {
            message.textContent = 'It\'s a draw!';
        }
        modal.style.display = 'block';
    }

    function toggleTurn() {
        if (whoseTurn === 'player1') {
            whoseTurn = 'player2';
            playerIcons[0].classList.remove('active-p1');
            playerIcons[1].classList.add('active-p2');
        } else {
            whoseTurn = 'player1';
            playerIcons[1].classList.remove('active-p2');
            playerIcons[0].classList.add('active-p1');
        }
    }

    function resetBoard() {
        hideModal();
        whoseTurn = 'player1';
        gameBoard.resetArray();
        playerIcons[0].classList.add('active-p1');
        playerIcons[1].classList.remove('active-p2');
        render(gameBoard.arr);
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    function render(arr) {
        for (let i = 0; i < 9; i++) {
            squares[i].textContent = arr[i];
        }
    }
})();
