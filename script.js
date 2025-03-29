
const gameboard = (function() {
    let board = [['.', '.', '.'], 
                 ['.', '.', '.'], 
                 ['.', '.', '.']];
    
    const displayBoard = () => console.log(board);
    
    const updatePlay = (marker, x, y) => {
        if (board[x][y] === ".") {
            board[x][y] = marker;
            return true;
        } else {
            console.log("invalid position");
            return false;
        }
    };

    const checkWin = () => {
        // Horizontal
        for (let i=0; i<3; i++) {
            if (board[i][0] === board[i][1] && 
                board[i][0] === board[i][2] && 
                board[i][0] !== ".") {
                return true;
            }
        }
        // Vertical 
        for (let i=0; i<3; i++) {
            if (board[0][i] === board[1][i] &&
                board[0][i] === board[2][i] && 
                board[0][i] !== ".") {
                return true;
            }
        }
        // Diagonal
        if (board[0][0] === board[1][1] &&
            board[0][0] === board[2][2] && 
            board[0][0] !== ".") {
            return true;
        }
        if (board[0][2] === board[1][1] &&
            board[0][2] === board[2][0] && 
            board[0][2] !== ".") {
            return true;
        }
    };
    
    return {displayBoard, updatePlay, checkWin};
})();

function createPlayer(marker) {
    const play = () => {
        const x = prompt(`Player ${marker}: What x to play?`)
        const y = prompt(`Player ${marker}: What y to play?`)
        const validity = gameboard.updatePlay(marker, x, y);
        if (!validity) play();
    };

    return {play};
}

const gameFlow = (function() {
    const playerX = createPlayer('x');
    const playerO = createPlayer("o");
    let gameEnd = false;
    let playerWin;
    gameboard.displayBoard()

    while(!gameEnd) {
        playerX.play();
        if (gameboard.checkWin()) {
            playerWin = "X";
            gameEnd = true;
            break;
        };
        gameboard.displayBoard()
        playerO.play();
        if (gameboard.checkWin()) {
            playerWin = "O";
            gameEnd = true;
            break;
        };
        gameboard.displayBoard()
    };

    console.log(`Player ${playerWin} won!!`);
})();