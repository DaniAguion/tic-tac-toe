
// Function to redraw the gameboard
function render(){
    gameAreaElmt.innerHTML = "";
    const gameBoardRow = [];
    const gameBoardCells = Array.from({ length: game.gameboard.length }).map(() => Array.from({ length: game.gameboard.length }));

    printTurn();
    printResult();

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


            // Color the cell if it is part of the winning line
            for (let k = 0; k < game.winningLine.length; k++){
            if ((i === game.winningLine[k][0]) && (j === game.winningLine[k][1])){
                    gameBoardCells[i][j].classList.add("WinningCell");
                }
            }
            

            // Event listener to check wich cell is clicked
            // Call makeMove, render, checkWinner and togglePlayer
            gameBoardCells[i][j].addEventListener("click", () => {
                const x = parseInt(gameBoardCells[i][j].getAttribute("x"));
                const y = parseInt(gameBoardCells[i][j].getAttribute("y"));
                if (makeMove(x, y)) {
                    if (checkWinner() === false) {
                        game.togglePlayer();
                        printTurn();
                    }
                    render();
                }
            });
        }
    }
}

// Function to show the turn
function printTurn(){
    const turnContainer = document.getElementById("turn_area");
    turnContainer.innerHTML="";
    const turnText = document.createElement("p");
    turnText.textContent = "It's turn of player: " + game.actualPlayer.symbol;
    turnContainer.appendChild(turnText);
}

// Function to show the result
function printResult(){
    const resultContainer = document.getElementById("result_area");
    resultContainer.innerHTML="";

    if (game.result != ""){
        const resultText = document.createElement("p");
        resultText.textContent = game.result;
        resultContainer.appendChild(resultText);
    }
}