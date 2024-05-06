/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
const iterableCells = Array.from(cells)
const sprite = document.querySelector(".grass div.sprite")
const width = 20

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [125, 126, 127, 128, 129]
let headIndex 
let currentHeadIndex
let currentBodyIndex
let gameOver

let timer
let lastKeyDown = "ArrowDown"

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
    currentBodyIndex = snakePosition
    console.log("currentHeadIndex: ", currentHeadIndex)
    console.log("currentBodyIndex: ", currentBodyIndex)
    selfHit();
    solidWalls();
    render();
}


//Solid wall logic

// This only works for the top and bottom of the board
// function solidWalls() {
//     if (currentHeadIndex < 0 || currentHeadIndex > 399) {
//         gameOver = true
//     }
// }

// Adapted from ex9 in grid labs
function solidWalls() {
    const rowPosition = currentHeadIndex % width
    const colPosition = Math.floor(currentHeadIndex / width)
    if (colPosition <= 0 || colPosition === width -1) {
        console.log("Game should be over!")
        gameOver = true
    }
    if (rowPosition <= 0 || rowPosition === width -1) {
        console.log("Game should be over!")
        gameOver = true
    }
}
//If it hits the left hand side it still pokes through the right wall... 
//? Temp fix with wall but raises issues with adding images over another class
//? ID can't be used or it messes with the cells constant
//? However, this helps fulfil the criteria of no errors in console as it never breaches edge


//Self-hit logic
//I can see on console that the currentBodyIndex and currentHeadIndex can both have the same
//value in the same array and still the below doesn't seem to trigger gameOver true.
function selfHit() {
    currentBodyIndex.forEach((bodyPart) => {
        if (currentHeadIndex === bodyPart) {
            gameOver === true
            console.log(bodyPart)
            //it's never logging bodyPart
        }
    })
}

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (event) => {
    lastKeyDown = event.key;
})

