/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
//const iterableCells = Array.from(cells)
const width = 20
//cells[56].classList.add("mouse")

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [125, 126, 127, 128, 129, 130, 131]
let headIndex 
let currentHeadIndex
let currentBodyIndex
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
    //Tail not popped if mouseEaten
    if (currentHeadIndex !== mouseIndex) {
        snakePosition.pop();}
    headIndex = snakePosition[0]
    snakePosition.unshift(headIndex + direction)
    currentHeadIndex = snakePosition[0]
    currentBodyIndex = snakePosition.slice(1)
    console.log("currentHeadIndex: ", currentHeadIndex)
    console.log("currentBodyIndex: ", currentBodyIndex)
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
//If it hits the left hand side it still pokes through the right wall... 
//? Temp fix with wall but raises issues with adding images over another class
//? ID can't be used or it messes with the cells constant
//? However, this helps fulfil the criteria of no errors in console as it never breaches edge
// ? BUG: MOUSE CAN APPEAR IN WALL AREA WHICH IS INACCESSIBLE

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
/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener("keydown", (event) => {
    lastKeyDown = event.key;
})