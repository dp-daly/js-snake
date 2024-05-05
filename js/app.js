/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
const width = 20

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [42, 43, 44, 45, 46, 47, 48]
let headIndex
let gameOver

//Sets default movement with interval, which is later altered in the autoMove function
let timer
let lastKeyDown = "ArrowUp"

/*------------------------ Cached Element References ------------------------*/

const playAgainBtnEl = document.querySelector("#restart")
const gameMessageEl = document.querySelector("#message")

/*-------------------------------- Functions --------------------------------*/

function init() {
    gameOver = false;
    playAgainBtnEl.classList.add("hidden")
    gameMessageEl.classList.add("hidden")
    autoMove()
    render()
}

init()


function autoMove() {
    timer = setInterval(() => {
        moveSnake({key: lastKeyDown})
    }, 350)
}

function render() {
    if (gameOver === true) {
        clearInterval(timer)
        playAgainBtnEl.classList.remove("hidden")
        gameMessageEl.classList.remove("hidden")
    }
    //Removes all instances of the sprite class in any cell
    cells.forEach((cell, index) => {
        cells[index].classList.remove("sprite")
    })
   //Adds each element of the body back at the relevant locations
    snakePosition.forEach((bodyPart) => {
    cells[bodyPart].classList.add("sprite")
})
}

function moveSnake(event) {
    let direction = 0
    if (event.key === "ArrowUp") {
        direction = -width
    } else if (event.key === "ArrowDown") {
        direction = width
    } else if (event.key === "ArrowLeft") {
        direction = -1
    } else if (event.key === "ArrowRight") {
        direction = 1
    }
    snakePosition.forEach((bodyPart, index) => {
        snakePosition[index] = bodyPart
    })
    //Back to excalidraw and playing basic game, took hint about 'removing the last one' 
    //Using array methods (not iterator methods) to modify the array in place dynamically!
    //pop() removes the last value in the array
    snakePosition.pop();
    //Unshift replaces the first position. I removed direction "+ direction" from the loop so 
    //only the headIndex responds to the direction. This gives the signature snake slither and
    //the necessary delay to allow it to more likely crash into itself (part of win/lose logic).
    snakePosition.unshift(snakePosition[0] + direction)
    //Render is called immediately following the move conditional logic
    render();
}

//Solid wall logic
//! Top and bottom
//If the snake's head ends up less than 0 or more than 24, gameOver is true
//Added rudimentary gameOver logic to test


//! Sides
//If the snake's head ends up less than 4 or more than 4, gameOver is true - but how? 


/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (event) => {
    lastKeyDown = event.key;
})

