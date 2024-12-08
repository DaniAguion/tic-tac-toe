
// Factory Function to create a game
const Game = (function(){

    const defaultSize = 3;

    return function(){
        this.gameboard = Array.from({ length: defaultSize }, () => Array(defaultSize).fill(""));
        this.turn = 1;
        this.turnLimit = defaultSize* 3;
        this.player1 = new player("O");
        this.player2 = new player("X");
        this.players = [this.player1, this.player2];
        this.actualPlayer = this.player1;
        this.winner = "";
        this.winningLine = [ ];
        this.result = "";

        this.togglePlayer = function(){
            if (this.actualPlayer === this.player1){
                this.actualPlayer = this.player2;
            }
            else{
                this.actualPlayer = this.player1;               
            }
            this.turn++;
        }

        this.restartGame= function(){
            this.turn = 1;
            this.actualPlayer = this.player1;
            this.gameboard = this.gameboard.map(row => row.map(() => ""));
            this.winner = "";
            this.winningLine = [ ];
            this.result = "";
        }
    };
})();


// Initialization area
const game = new Game();

const gameAreaElmt = document.getElementById("game_area");
const startBtn = document.getElementById("startBtn");

render();


// Definition of start game event
startBtn.addEventListener("click",function(){
    game.restartGame();
    render();
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
        for (let j = 1; j < game.gameboard.length - 1; j++){
            if ((game.gameboard[i][j] === player.symbol) && (game.gameboard[i][j] === game.gameboard[i][j-1]) && (game.gameboard[i][j] === game.gameboard[i][j+1])){
                game.winner = player.symbol;
                game.winningLine.push([i,j-1]);
                game.winningLine.push([i,j]);
                game.winningLine.push([i,j+1]);
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
        for (let i = 1; i < game.gameboard.length - 1; i++){
            if ((game.gameboard[i][j] === player.symbol) && (game.gameboard[i][j] === game.gameboard[i-1][j]) && (game.gameboard[i][j] === game.gameboard[i+1][j])){
                game.winner = player.symbol;
                game.winningLine.push([i-1,j]);
                game.winningLine.push([i,j]);
                game.winningLine.push([i+1,j]);
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

    for(let i = 1; i < game.gameboard.length - 1; i++){
        for(let j = 1; j < game.gameboard.length - 1; j++){
            // Check diagonals from left top to right bottom
            if ((game.gameboard[i][j] === player.symbol) && (game.gameboard[i][j] === game.gameboard[i-1][j-1]) && (game.gameboard[i][j] === game.gameboard[i+1][j+1])){
                game.winner = player.symbol;
                game.winningLine.push([i-1,j-1]);
                game.winningLine.push([i,j]);
                game.winningLine.push([i+1,j+1]);
                return;
            };

            // Check diagonals from left bottom to right top
            if ((game.gameboard[i][j] === player.symbol) && (game.gameboard[i][j] === game.gameboard[i+1][j-1]) && (game.gameboard[i][j] === game.gameboard[i-1][j+1])){
                game.winner = player.symbol;
                game.winningLine.push([i+1,j-1]);
                game.winningLine.push([i,j]);
                game.winningLine.push([i-1,j+1]);
                return;
            };
        };
    };

}


