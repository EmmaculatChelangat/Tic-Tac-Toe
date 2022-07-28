// create a constant variable for our x and o characters
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    // combinations of movements for winning the game
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// used the squared brackets ([]) to target the data-cell attribute
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn;

startGame()

// trigger the events which may happen on our board
restartButton.addEventListener('click', startGame)

function startGame() { //function for staring the game
  circleTurn = false  //set to false  meaning the first to play will be an x character
  cellElements.forEach(cell => {
    // this function removes all characters left from previous gamePlay
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

// code
function handleClick(e) {  //handle the mouse click events for the cell in the board
  const cell = e.target

//   current class variable saves the character(x or o) 
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)

//   if statement to check if someone has already won by comparing 
// the winning combinations to the gameplay. This way it determines whether there is a draw or not.
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) { // It is the function that ends the game.

    // The function can either display a winner message which specifies 
    // which character won or a message that states there is no winner – it is a draw, depending on the outcome of the if statement. 
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() { //This one just returns the value in case there is a draw, meaning that neither of the players has won.
  return [...cellElements].every(cell => { //every that checks all elements of an array to confirm a condition by returning a boolean value
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) { //placeMark() places the character in the cell
  cell.classList.add(currentClass) //currentClass being either an X or an O depending on whose turn it is
}

function swapTurns() { //swaps the turns after the character is placed in a cell.
  circleTurn = !circleTurn
}


// Making Tic-Tac-Toe JavaScript game more interactive
// we will set the cursor hovering effect onto the board. This will make it easier for the player to aim at the cells
function setBoardHoverClass() { //setBoardHoverClass()--character to appear in the cells while hovering over them with our mouse cursor before placing them,
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) { // checkWin() which is called to check if our board matches any of the winning combinations.
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}