/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
//const iterableCells = Array.from(cells)
const width = 20
//cells[56].classList.add("mouse")

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [125, 126, 127, 128]
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
    currentBodyIndex = snakePosition.slice(1)
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
//! Working now - was using wrong "=" 
//! Now need to add condition so that the first value in the body index is immune
//! Added slice to currentBodyIndex
function selfHit() {
    currentBodyIndex.forEach((bodyPart) => {
        if (currentHeadIndex === bodyPart) {
            gameOver = true
            console.log(bodyPart)
            //it's never logging bodyPart
            //nb. currentBodyIndex is already a dynamically-created array, updated every
            //second - could that be why?
        }
    })
}


//Hint with grow logic - 'stop one thing you're doing' -- so just stop .pop()?
//Food appears on random cell


//There will be an issue with generating numbers that equal the value of the border/river
//console.log(generateRandomNum())
//console.log(generateRandomNum())
// function generateRandomNum() {
//     return Math.floor(Math.random() * 399)
// }


// function foodAppears() {
//     mouseIndex = generateRandomNum()
//     cells[mouseIndex].ClassList.add("mouse")
//     if (headIndex === mouseIndex) {
//         cells[mouseIndex].ClassList.remove("mouse")
//     }
// }


/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (event) => {
    lastKeyDown = event.key;
})

