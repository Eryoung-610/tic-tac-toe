/*
GRID SKETCH FOR REFERENCING WIN CONDITIONS

1 | 2 | 3
4 | 5 | 6
7 | 8 | 9

-win cons are 
    -ROWS [1,2,3],[4,5,6],[7,8,9]
    -COLS [1,4,7],[2,5,8],[3,6,9]
    -DIAG [1.5.9],[3,5,7]
    
    TOTAL OF 8 COMBINATIONS

Functions needed
    -Initliaze
        -Starts with X turn first
        -Needs to display who's turn it is
    -selectedBox
        -Verify if a box is empty.
        -If box is empty, then run choice and update turn box, else then choose another box
    -choice
        -Fills specific box with an X or an O
        -If the symbol is an X already then it will be an O, if not O, then X.
        -This also serves as a way for alternating turns, instead of using a counter++ and if(counter % 2 == 0)...  
    -fullBox
        -doc.getId(td id).innerText
    -fullRow
        -need a boolean here to see if a row is filled
        -call fullBox and if x y z are filled then return true
    -winCons
        -Utilize td id's to verify winning conditions in both horizontal,vertical, and diagonal possibilities.
        -Has to be an || because there's only 1 winner.
        -Utilize fullRow to verify all possibilites.
        If no winner, else turnUpdate("No winner")
*/

// document.getElementById("5").innerText = "TEST";



//Message box Ref
const updateBox = document.getElementById("turn");

//Winner box Ref
const results = document.getElementById("results");

//For fun button Ref
let playButton = document.getElementById("clickMe");

let restartButton = document.getElementById("restart");

let x = document.createElement("IMG1");
// x.src = "/img/dirtyDan.jpg";



// function testFunction(){
//     let x = document.createElement("IMG");
//     x.setAttribute("src", "/img/dirtyDan.jpg");
//     x.setAttribute("width", "150");
//     x.setAttribute("height", "150");
//     document.getElementById("1").appendChild(x);
// }

function init() {
    clearBox();
    document.symbol = "X";
    document.win = null;
    playSound();
    turnUpdate("It is " + document.symbol + "'s turn");
    results.innerText = "";
    restartButton.disabled = true;
}

function selectedBox(option) {
    if(document.win != null) {
        turnUpdate(document.symbol + " won already!");
    } else if(option.innerText == ''){
        option.innerText = document.symbol;
        choice();
        turnUpdate("It is " + document.symbol + "'s turn");
    } else {
        turnUpdate("Invalid Option");
    }
    
}

function choice() {
    if(winCons(document.symbol)) {
        results.innerText = document.symbol + " wins!";
        document.win = document.symbol;
        restartButton.disabled = false; 
    }
    if (document.symbol == "X") {
        document.symbol = "O";
    } else {
        document.symbol = "X"
    }
}

function turnUpdate(update) {
    updateBox.innerText = update;

    //Erases who's turn it is after winner is declared.
    if (document.win != null) {
        document.getElementById("turn").innerText = "";
    }

}

function fullBox(boxNum){
    return document.getElementById(boxNum).innerText;
}

function fullRow(x, y, z, filled) {
    var fill = false;
    if (fullBox(x) == filled && fullBox(y) == filled && fullBox(z) == filled) {
        fill = true;
    }
    return fill;
}

function winCons(filled){
    var winnerFound = false;
    if (fullRow(1,2,3,filled) ||
        fullRow(4,5,6,filled) || 
        fullRow(7,8,9,filled) ||
        fullRow(1,4,7,filled) ||
        fullRow(2,5,8,filled) ||
        fullRow(3,6,9,filled) ||
        fullRow(1,5,9,filled) ||
        fullRow(3,5,7,filled)) {
            winnerFound = true;    
        } else if (
        fullRow(1,2,3,filled) && //Top row
        fullRow(4,5,6,filled) && //Middle row
        fullRow(7,8,9,filled) && //Bottom row
        fullRow(1,4,7,filled) && //left col
        fullRow(2,5,8,filled) && //mid col
        fullRow(3,6,9,filled) && // right col
        fullRow(1,5,9,filled) && //L->R diag
        fullRow(3,5,7,filled)) { // R -> diag
            results.innerText = "No winner!"      
        } else {
            winnerFound = false;
            
        }
        return winnerFound;
}

//Very redundant
function clearBox() {
    document.getElementById("1").innerText = "";
    document.getElementById("2").innerText = "";
    document.getElementById("3").innerText = "";
    document.getElementById("4").innerText = "";
    document.getElementById("5").innerText = "";
    document.getElementById("6").innerText = "";
    document.getElementById("7").innerText = "";
    document.getElementById("8").innerText = "";
    document.getElementById("9").innerText = "";
}


function playSound() {
    document.getElementById("test").play();
}