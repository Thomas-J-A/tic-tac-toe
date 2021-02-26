const gameBoard = (() => {
    let arr = ['', '', '', '', '', '', '', '', ''];

    function isFree(index) {
        return (arr[index] === '') ? true : false;
    }

    function updateArr(index, marker) {
        arr[index] = marker;
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
        updateArr
    };
})();


const displayController = (() => {
    // local variables
    let whoseTurn = 'player1';

    // cache DOM
    const squares = document.querySelectorAll('.square');

    // event callbacks
    function updateBoard(e) {
        const index = e.target.getAttribute('data-index');
        if (!gameBoard.isFree(index)) return;
        const marker = (whoseTurn === 'player1') ? 'x' : 'o';
        gameBoard.updateArr(index, marker);
        toggleTurn();
        render(gameBoard.arr);
        isGameOver(marker);
    }

    function toggleTurn() {
        (whoseTurn === 'player1') ? whoseTurn = 'player2' : whoseTurn = 'player1';
    }

    function isGameOver(marker) {
        if (gameBoard.isThreeInARow(marker)) alert('three in a row');
        if (gameBoard.isTie()) alert('tie');
    }

    // add event listeners
    squares.forEach(square => {
        square.addEventListener('click', updateBoard);
    });

    function render(arr) {
        for (let i = 0; i < 9; i++) {
            squares[i].textContent = arr[i];
        }
    }
    
    return {
        render
    };
})();


// Player factory 
function Player() {

};
