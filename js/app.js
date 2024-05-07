/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
const walls = document.querySelectorAll(".grass div.wall")

//loop through cells
//save cells that has class of walls and sprites
//save list of indexes 
//const cellsIndexArray = Array.from(cells)
const width = 20

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [125, 126, 127, 128, 129, 130]
let headIndex 
let currentHeadIndex
let currentBodyIndex
let invalidCellIndexes = []
let unfilteredMouseIndex
let mouseIndex
let gameOver

let timer
let lastKeyDown = "ArrowDown"

/*------------------------ Cached Element References ------------------------*/

const playAgainBtnEl = document.querySelector("#restart")
const gameMessageEl = document.querySelector("#message")
const themeButton = document.querySelector("#theme")
//const sprite = document.querySelector(".grass div.sprite")
//const mouse = document.querySelector(".grass .div.mouse")

/*-------------------------------- Functions --------------------------------*/

function init() {
    gameOver = false;
    playAgainBtnEl.classList.add("hidden")
    gameMessageEl.classList.add("hidden")
    autoMove()
    render()
}

init();
mouseAppears();

function autoMove() {
    timer = setInterval(() => {
        moveSnake({key: lastKeyDown})
    }, 250)
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
    //Tail not popped if mouseEaten
    if (currentHeadIndex !== mouseIndex) {
        snakePosition.pop();}
    headIndex = snakePosition[0]
    snakePosition.unshift(headIndex + direction)
    currentHeadIndex = snakePosition[0]
    currentBodyIndex = snakePosition.slice(1)
    console.log("currentHeadIndex: ", currentHeadIndex)
    console.log("currentBodyIndex: ", currentBodyIndex)
    getInvalidCellIndexes();
    selfHit();
    solidWalls();
    mouseIsEaten();
    render();
}


//Solid wall logic

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

function selfHit() {
    currentBodyIndex.forEach((bodyPart) => {
        if (currentHeadIndex === bodyPart) {
            gameOver = true
        }
    })
}


//! Mouse appear/eaten
function generateRandomNum() {
    return Math.floor(Math.random() * 399)
}


//! Trying to resolve mouse appearing in wall bug
//Having issues with filtering correctly - 
//Unsure how to say "if it contains a number from this list, go back and generate a new random number"
//A while loop causes the browser to crash
// ? Next: create a list of valid cells instead? and use if/else below to assign mouse index
function mouseAppears() {
    unfilteredMouseIndex = generateRandomNum()
    if (invalidCellIndexes.includes(unfilteredMouseIndex)) {
        unfilteredMouseIndex = generateRandomNum()
    }
    mouseIndex = unfilteredMouseIndex;
    cells[mouseIndex].classList.add("mouse")
}

function mouseIsEaten() {
    if (headIndex === mouseIndex) {
        //disappear
        cells[mouseIndex].classList.remove("mouse")
        //respawn
        mouseAppears()
    }
}

function getInvalidCellIndexes() {
    cells.forEach((cell, i) => {
    if (cell.classList.contains("wall") || cell.classList.contains("sprite")) {
        invalidCellIndexes.push(i)
    }})
    //console.log(invalidCellIndexes)
    //Dynamically updated array of numbers can now be compared with random number generated
}

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener("keydown", (event) => {
    lastKeyDown = event.key;
})