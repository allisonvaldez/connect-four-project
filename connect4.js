/*
QUESTIONS:
1.  makeboard - when did we make the array for height?
*/


/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  /* TODO: set "board" to empty HEIGHT x WIDTH matrix array 
      - it should be dynamic and use the global variables for flexibility
      - Array.from() creates an array from an iterable object
      - length: sets an empty array with the allocated amonut of spaces
  */
  for (let y = 0; y < HEIGHT; y++){
    board.push(Array.from({length: WIDTH}))
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // this is in charge of making the board show up on the page
  let htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  // creates a DOM table row element called top 
  let top = document.createElement("tr");

  // sets the DOM element id attribute to column top (css features activated)
  top.setAttribute("id", "column-top");

  /* 
  sets up an eventListener when the DOM element is clicked to trigger the handleClick()
  */
  top.addEventListener("click", handleClick);

  // for loop to create board rows
  for (let x = 0; x < WIDTH; x++) {
    // creates a DOM element for the table cell
    let headCell = document.createElement("td");

    // sets the DOM element id attribute to x 
    headCell.setAttribute("id", x);

    // appends the cell to the top row
    top.append(headCell);
  }

  // appends the DOM element of the top row to the board (table)
  htmlBoard.append(top);

  // TODO: add comment for this code
  // for loop for creating the rest of the board
  for (let y = 0; y < HEIGHT; y++) {
    // creates a row for the table
    const row = document.createElement("tr");
    // for loop for creating the cells for the rest of the table
    for (let x = 0; x < WIDTH; x++) {
      // create the DOM element for the cell
      const cell = document.createElement("td");

      // sets the attribute of the cell (based on location?)
      cell.setAttribute("id", `${y}-${x}`);

      // appends the cell to the row
      row.append(cell);
    }
    // appends the row to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const gamePiece = document.createElement("div");

  // put the class "piece" on gamePiece
  gamePiece.classList.add("piece");

  // put a class on the piece for who is currently playing
  gamePiece.classList.add(`${currPlayer}`);
  
  // determines where to put the game piece on the board
  const pieceSpot = document.getElementById(`${y} - ${x}`);

  // places the piece spot on the table cell
  pieceSpot.append(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  // this should update the board variable with the player number
  htmlBoard[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  
  // TODO: check if all cells in board are filled; if so call, call endGame
  // check for tie during gameplay
  if (htmlBoard.every(row => row.every(cell => cell))) {
    return endGame("It's a TIE!")
  }


  // TODO: switch currPlayer 1 <-> 2
  // switch players during game play
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
