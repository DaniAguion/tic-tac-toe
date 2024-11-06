// Factory Function to create a game
const Game = (function(){

    const defaultSize = 3;

    return function(){
        this.gameboard = Array.from({ length: defaultSize }, () => Array(defaultSize).fill(""));
        this.turn = 1;
        this.turnLimit = defaultSize* 3;
        this.player1 = new player("o");
        this.player2 = new player("x");
        this.players = [this.player1, this.player2];
        this.actualPlayer = this.player1;
        this.winner = "";
        this.result = "";

        this.togglePlayer = function(){
            if (this.actualPlayer === this.player1){
                this.actualPlayer = this.player2;
            }
            else{
                this.actualPlayer = this.player1;               
            }
            console.log(this.turn);
            this.turn++;
        }

        this.restartGame= function(){
            this.turn = 1;
            this.actualPlayer = this.player1;
            this.gameboard = this.gameboard.map(row => row.map(() => ""));
            this.winner = "";
            this.result = "";
        }

        render();
    };
})();


const game = new Game();

const gameAreaElmt = document.getElementById("game_area");
const startBtn = document.getElementById("startBtn");


render();



startBtn.addEventListener("click",function(){
    game.restartGame();
    render();
    console.log(game.gameboard);
});





// Function to construct player
function player(playerSymbol){
    this.symbol = playerSymbol;
}



// Function to set a piece
function makeMove(x, y){
    if ((x > game.gameboard.length - 1) || (y > game.gameboard.length - 1)){
        return false;
    }

    if (game.gameboard[x][y] === ""){
        game.gameboard[x][y] = game.actualPlayer.symbol;
        return true;
    }
    else{
        return false;
    }
}



// Function to let the program make a random move
function randomMove(){
    let randomX = 0;
    let randomY = 0;
    do{
        randomX = Math.floor(Math.random() * 3);
        randomY = Math.floor(Math.random() * 3);
    } while ((makeMove(randomX, randomY) === false));
}



// Function to check if one of the player has won
function checkWinner(){
    for (let i = 0; i < game.players.length; i++){
        checkRow(game.players[i]);
        checkColumn(game.players[i]);
        checkDiagonal(game.players[i]);
    }

    if (game.winner != ""){
        game.result = "The winner is " + game.winner + "."
        return true;
    }
    
    if (game.turn === game.turnLimit){
        game.result = "Draw.";
        return true;
    }

    return false;
}



// Function to check if there is a winning row
function checkRow(player){
    if (game.winner != ""){
        return;
    }

    for(let i = 0; i < game.gameboard.length; i++){
        for (let j = 0; (game.gameboard[i][j] === player.symbol); j++){
            if (j === game.gameboard.length - 1){
                game.winner = player.symbol;
                return;
            };
        };
    };
}



// Function to check if there is a winning column
function checkColumn(player){
    if (game.winner != ""){
        return;
    }

    for(let j = 0; j < game.gameboard.length; j++){
        for (let i = 0; (game.gameboard[i][j] === player.symbol); i++){
            if (i === game.gameboard.length - 1){
                game.winner = player.symbol;
                return;
            };
        };
    };
}



// Function to check diagonal from left corners
function checkDiagonal(player){
    if (game.winner != ""){
        return;
    }

    let i = 0;
    let j = 0;

    for(i = 0, j = 0; (game.gameboard[i][j] === player.symbol); i++, j++){
        if (j === game.gameboard.length - 1){
            game.winner = player.symbol;
            return;
        };
    };

    for(i = game.gameboard.length-1, j = 0; (game.gameboard[i][j] === player.symbol); i--, j++){
        if (j === game.gameboard.length - 1){
            game.winner = player.symbol;
            return;
        };
    };
}



// Function to simulate a game
// Change this function to just make a random move
function simGame(){
    for(game.turn = 0; game.turn < game.turnLimit; game.turn++){   
        if (game.turn % 2 === 0){
            randomMove();
        }else{
            randomMove();
        }

        if (checkWinner() === true){
            break;
        }
        game.togglePlayer();
    }

    checkWinner();

    console.log(game.gameboard);
    console.log(game.result);
}



// Function to redraw the gameboard
function render(){
    gameAreaElmt.innerHTML = "";
    const gameBoardRow = [];
    const gameBoardCells = Array.from({ length: game.gameboard.length }).map(() => Array.from({ length: game.gameboard.length }));

    for (let i = 0; i < game.gameboard.length; i++){
        gameBoardRow[i] = document.createElement("div");
        gameBoardRow[i].classList.add("row");
        gameAreaElmt.appendChild(gameBoardRow[i]);

        for (let j = 0; j < game.gameboard.length; j++ ){
            gameBoardCells[i][j] = document.createElement("div");
            gameBoardCells[i][j].textContent = game.gameboard[i][j];
            gameBoardCells[i][j].setAttribute("x",i);
            gameBoardCells[i][j].setAttribute("y",j);
            gameBoardCells[i][j].classList.add("cell");
            gameBoardRow[i].appendChild(gameBoardCells[i][j]);
            

            // Event listener to check wich cell is clicked
            // Call makeMove, render, checkWinner and togglePlayer
            gameBoardCells[i][j].addEventListener("click", () => {
                const x = parseInt(gameBoardCells[i][j].getAttribute("x"));
                const y = parseInt(gameBoardCells[i][j].getAttribute("y"));
                if (makeMove(x, y)) {
                    render();
                    if (checkWinner()) {
                        printResult();
                    }
                    game.togglePlayer();
                }
            });
        }
    }

}



// Function to show the result
function printResult(){
    const resultCont = document.createElement("div");
    const resultText = document.createElement("p");
    resultText.textContent = game.result;
    resultCont.appendChild(resultText);
    gameAreaElmt.appendChild(resultCont);
}