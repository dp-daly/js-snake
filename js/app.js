/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
const iterableCells = Array.from(cells)
const sprite = document.querySelector(".grass div.sprite")
const width = 20

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [4, 5, 6, 7, 8, 9]
let headIndex 
let currentHeadIndex
let gameOver

let timer
let lastKeyDown = "ArrowDown"

/*------------------------ Cached Element References ------------------------*/

const playAgainBtnEl = document.querySelector("#restart")
const gameMessageEl = document.querySelector("#message")

/*-------------------------------- Functions --------------------------------*/

function init() {
    gameOver = true;
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
    cells.forEach((cell, index) => {
        cells[index].classList.remove("sprite")
    })
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
    snakePosition.pop();
    headIndex = snakePosition[0]
    snakePosition.unshift(headIndex + direction)
    currentHeadIndex = snakePosition[0]
    console.log("currentHeadIndex: ", currentHeadIndex)
    solidWalls();
    render();
}


//! Bug found: at the moment the snake can turn back on itself. May be able to
//! fix this in logic that ends game when snake runs into itself/walls. 

//Solid wall logic

//This only works for the top and bottom of the board
//Will need impenetrable wall logic which must be the solution to ex9 in grid lab
function solidWalls() {
    if (currentHeadIndex < 0 || currentHeadIndex > 399) {
        gameOver = true
    }
}



/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (event) => {
    lastKeyDown = event.key;
})

