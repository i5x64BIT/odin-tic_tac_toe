const game = function(){
    const proto = [ //Set the board with empty objects so comparing doesn't give a false positive
        [{},{},{}],
        [{},{},{}],
        [{},{},{}]
    ];
    let board = proto.slice();
    const boardElements = document.querySelectorAll('.board > div');
    const controlButtons = document.querySelectorAll('.controls button')

    const updateBoard = (boardElement,location, value) => {
        coordinates = location.split('-');
        board[coordinates[0]][coordinates[1]] = value;

        if(value == 'x') boardElement.innerText = 'x';
            else boardElement.innerText = 'o'
    }
    const getBoard = () => board;
    const isGameOver = () => {
        //In a row
        for(let i = 0; i < 3; i++){
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2]) return true;
        }
        //In a column
        for(let i = 0; i < 3; i++){
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i]) return true;
        }
        //In cross
        if( (board[0][0] === board[1][1] && board[1][1] === board[2][2]) || 
            (board[0][2] === board[1][1] && board[1][1] === board[2][0]) ) return true;

        return false;
    }
    const restart = () => {
        boardElements.forEach(b => b.innerText='');
        board = proto.slice();
    }


    //Get User Choice
    controlButtons.forEach(b => {
        b.addEventListener('click', () => {
            const prevSelection = document.querySelector('selected');
            if(prevSelection) prevSelection.classList.toggle('selected')
            b.classList.toggle('selected')
        });
    })

    //Get User Board Input
    boardElements.forEach((e) => {
        e.addEventListener('click', () => {
            const btnActive = document.querySelector(':checked + label');
            if(!btnActive) {
                alert('Please Select a Sign First!');
                return;
            }
            const { location } = e.dataset;
            const { choice } = btnActive.dataset

            updateBoard(e, location, choice);

            if(isGameOver()){
                if(alert(`${choice} has Won!!!`));
                restart();
            }
        });
    });

    return { getBoard, restart }
}();

