// Function to let the program make a random move
function randomMove(){
    let randomX = 0;
    let randomY = 0;
    do{
        randomX = Math.floor(Math.random() * 3);
        randomY = Math.floor(Math.random() * 3);
    } while ((makeMove(randomX, randomY) === false));
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
}
