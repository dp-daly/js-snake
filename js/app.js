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
let validCellIndexes = []
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
    getValidCellIndexes();
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
//Generate random array from the validCellIndexes array
function generateRandomNum() {
    return validCellIndexes[(Math.floor(Math.random() * validCellIndexes.length))]
}

//! Trying to resolve mouse appearing in wall bug
// I think this logic is right, but we get a type error because the random number isn't generated
// until the validCellIndexes is dynamically created during gameplay.
// Three options:
// 1/ Play with timing of when to call the function - but I know I don't want it in the interval otherwise
// it will refresh at the wrong pace.
// 2/ Break up the function and play with timing - unsure if this will work.
// 3/ Have validCellIndexes generated statically at the start and allow food to appear on snake and consider an 'updatevalidcellindexes' function separately
// which would remove the sprite from the validCellsIndex array.
// ? Before doing that, try one more thing with using two functions to create a filtering loop
// ? for the randomIndex.
function mouseAppears() {
    mouseIndex = generateRandomNum()
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

function getValidCellIndexes() {
    cells.forEach((cell, i) => {
    if (!cell.classList.contains("wall") && !cell.classList.contains("sprite")) {
        validCellIndexes.push(i)
    }})
}

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener("keydown", (event) => {
    lastKeyDown = event.key;
})