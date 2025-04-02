
const gameboard = (function() {
    let board = [['', '', ''], 
                 ['', '', ''], 
                 ['', '', '']];
    
    const getBoard = () => {
        return board;
    }
    
    const updatePlay = (marker, x, y) => {
        if (board[x][y] === "") {
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
                board[i][0] !== "") {
                return true;
            }
        }
        // Vertical 
        for (let i=0; i<3; i++) {
            if (board[0][i] === board[1][i] &&
                board[0][i] === board[2][i] && 
                board[0][i] !== "") {
                return true;
            }
        }
        // Diagonal
        if (board[0][0] === board[1][1] &&
            board[0][0] === board[2][2] && 
            board[0][0] !== "") {
            return true;
        }
        if (board[0][2] === board[1][1] &&
            board[0][2] === board[2][0] && 
            board[0][2] !== "") {
            return true;
        }
    };

    const checkEnd = () => {
        for (const i of board) {
            if (i.includes("")) return false;
        }
        return true;
    }

    const getNewBoard = () => {
        board = [['', '', ''], 
                 ['', '', ''], 
                 ['', '', '']];
    }
    
    return {getBoard, updatePlay, checkWin, checkEnd, getNewBoard};
})();


function createPlayer(marker) {
    const play = (x, y) => {
        const validity = gameboard.updatePlay(marker, x, y);
        return validity;
    };

    return {play};
}


const gameFlow = (function() {
    const playerX = createPlayer('X');
    const playerO = createPlayer("O");
    let turnX = true;
    let gameEnd = true;
    let playerWin;
    let playerFirst = "Player X";
    let playerSecond = "Player O";

    const playRound = function(square) {
        if (gameEnd) {
            console.log("Game has already ended!")
            return
        }

        const [x, y] = square.id.split(" ");
        if (turnX) {
            if (playerX.play(x, y)) {
                turnX = false;
                return true;
            }
        } else {
            if (playerO.play(x, y)) {
                turnX = true;
                return true;
            }
        }
    }

    const checkRound = function() {
        if (gameboard.checkWin()) {
            gameEnd = true;
            if (turnX) {
                playerWin = playerSecond;
            } else {
                playerWin = playerFirst;
            }
        }

        else if (gameboard.checkEnd()) {
            gameEnd = true;
            playerWin = "No player";
        }

        if(gameEnd) {
            return playerWin;
        }
    }

    const getNames = function(firstName, secondName) {
        [playerFirst, playerSecond] = [firstName, secondName];
    }

    const getNewGame = () => {
        gameEnd = false;
        turnX = true;
        try {
            const winDOM = document.querySelector(".win").remove();
        } catch (error) {
            console.log(error)
        };
    }

    return {playRound, checkRound, getNames, getNewGame};

})();


const display = (function() {
    const boardDOM = document.querySelector(".board");
    const squares = document.querySelectorAll(".square");

    boardDOM.addEventListener("click", (e) => {
        if (gameFlow.playRound(e.target)) {
            displayBoard();
            displayWin();
        };
    });
    
    const displayWin = () => {
        const playerWin = gameFlow.checkRound();
        if (gameFlow.checkRound()) {
            const win = document.createElement("div");
            win.className = "win";
            win.textContent = `${playerWin} won!`;
            const game = document.querySelector(".game");
            game.insertBefore(win, boardDOM);
        }
    };

    const displayBoard = () => {
        const board = gameboard.getBoard();
        let iteration = 0;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                squares[iteration++].textContent = board[i][j];
            }
        }
    };

    return {displayBoard};
})();


const initalizeGame = (function() {
    // Get names
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendNames(form);
        
    });

    const sendNames = (form) => {
        const playerFirst = form.elements.playerX.value;
        const playerSecond = form.elements.playerO.value;
        gameFlow.getNames(playerFirst, playerSecond);
    };
    
    // Create new game
    const initializeBtn = document.createElement("button");
    initializeBtn.textContent = "New Game";

    const game = document.querySelector(".game");
    document.body.insertBefore(initializeBtn, game);

    initializeBtn.addEventListener("click", () => newGame());     

    const newGame = () => {
        gameFlow.getNewGame();
        gameboard.getNewBoard();
        display.displayBoard();
        game.style.display="block";
        console.log(gameboard.getBoard())
    }

})();