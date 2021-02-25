const gameBoard = (() => {
    let arr = ['', '', '', '', '', '', '', '', ''];
    
    function updateArr(index) {
        arr[index] = 'x';
    }

    return {
        arr,
        updateArr
    };
})();


const displayController = (() => {
    // cache DOM
    const squares = document.querySelectorAll('.square');

    // event callbacks
    function updateBoard(e) {
        const squareIndex = e.target.getAttribute('data-index');
        gameBoard.updateArr(squareIndex);
        displayController.render();
    }

    // add event listeners
    squares.forEach(square => {
        square.addEventListener('click', updateBoard);
    });

    function render() {
        const arr = gameBoard.arr;             
        for (let i = 0; i < arr.length; i++) {
            squares[i].textContent = arr[i];
        }
    }
    
    return {
        render
    };
})();



