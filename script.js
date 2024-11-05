// Factory Function to create a game
const Game = (function(){

    const defaultSize = 3;

    return function(){
        this.gameboard = Array.from({ length: defaultSize }, () => Array(defaultSize).fill(""));
        this.turn = 0;
        this.player1 = new player("o");
        this.player2 = new player("x");
        this.actualPlayer = this.player1;
        this.winner = "";

        this.togglePlayer = function(){
            if (this.actualPlayer === this.player1){
                this.actualPlayer = this.player2;
            }
            else{
                this.actualPlayer = this.player1;               
            }
        }
    };
})();




const game = new Game();



// Function to construct player
function player(playerSymbol){
    this.symbol = playerSymbol;
}

// Function to set a piece
function makeMove(x, y){
    game.gameboard[x][y] = game.actualPlayer.symbol;
}

// Function to check winner
function checkWinner(player){
    checkRow(player);
    checkColumn(player);
    //checkDiagonal(player);
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

function checkDiagonal(player){
    if (game.winner != ""){
        return;
    }
    // PENDING

}


// TEST
makeMove(0, 0);
makeMove(1, 0);
makeMove(2, 0);

checkWinner(game.actualPlayer);
console.log(game.gameboard);
console.log(game.winner);