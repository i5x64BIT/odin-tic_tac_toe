const boardElements = document.querySelectorAll('.board > div');

const Board = (() => { //Respopnsible for drawing and tracking
    const proto = [ //Set the board with empty objects so comparing doesn't give a false positive
        [{},{},{}],
        [{},{},{}],
        [{},{},{}]
    ];
    let board;
    
    const reset = () => {
        boardElements.forEach(b => b.innerText='');
        board = JSON.parse(JSON.stringify(proto)); //Deep Clone, either use this or recursion
    }
    const get = () => board;
    const update = (boardElement,location, value) => {
        coordinates = location.split('-');
        board[coordinates[0]][coordinates[1]] = value;

        if(value == 'x') boardElement.innerText = 'x';
            else boardElement.innerText = 'o'
    }

    reset(); //Board first setup

    return { get, update, reset };
})();

const Game = (() => {
    const btnRestart = document.querySelector('.controls-game #restart');
    let lastLocation;
    let currentSign;

    const getLastLocation = () => lastLocation;
    const getCurrentSign = () => currentSign;
    const isOver = () => {
        const board = Board.get();
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
        Board.reset();
    }


    //Get User Board Input + Game logic upon Event
    boardElements.forEach((e) => {
        e.addEventListener('click', () => {
            let btnActive = document.querySelector('input:checked');
            let btnInactive = document.querySelector('input:not(:checked)');
            if(!btnActive) {
                alert('Please Select a Sign First!');
                return;
            }
            lastLocation = e.dataset.location;
            currentSign = btnActive.dataset.choice;

            Board.update(e, lastLocation, currentSign); //Update board on each input event

            if(isOver()){
                if(alert(`${currentSign} has Won!!!`));
                restart();
            }
        });
    });
    
    //Control Input
    btnRestart.addEventListener('click', restart)
    

    return { getLastLocation, getCurrentSign, restart };
})();
