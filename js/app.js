/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
const walls = document.querySelectorAll(".grass div.wall")
const width = 20

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [125, 126, 127]
let headIndex 
let currentHeadIndex
let currentBodyIndex
let validCellIndexes = []
let croissantIndex
let croissantsEaten = 0
let gameOver
let timer
let lastKeyDown = "ArrowDown"

/*------------------------ Cached Element References ------------------------*/

const playAgainBtnEl = document.querySelector(".restart-button")
const gameMessageEl = document.querySelector("#message")
const themeButton = document.querySelector("#theme")

/*-------------------------------- Functions --------------------------------*/

cells.forEach((cell, i) => {
    if (!cell.classList.contains("wall")) {
        validCellIndexes.push(i)
    }})

function init() {
    gameOver = true;
    playAgainBtnEl.classList.add("hidden")
    autoMove()
    render()
}

init();
croissantAppears();

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
        cells.forEach((cell, index) => {
            cells[index].classList.remove("sprite")
        })
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
    if (currentHeadIndex !== croissantIndex) {
        snakePosition.pop();
    }
    if (currentHeadIndex === croissantIndex) {
        croissantsEaten += 1
    }
    headIndex = snakePosition[0]
    snakePosition.unshift(headIndex + direction)
    currentHeadIndex = snakePosition[0]
    currentBodyIndex = snakePosition.slice(1)
    //Can we dynamically remove sprite class instances from the static validCellIndexes array? 
    selfHit();
    solidWalls();
    croissantIsEaten();
    checkHowManyCroissants();
    render();
}

function checkHowManyCroissants() {
    if (croissantsEaten > 5) {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
    }, 300)
    }
    if (croissantsEaten > 10) {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 250)
    }
    if (croissantsEaten > 15) {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 200)
    }
    if (croissantsEaten > 20) {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 150)
    }
    if (croissantsEaten > 30) {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 100)
    }
    if (croissantsEaten > 40) {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 50)
}
}

function solidWalls() {
    const rowPosition = currentHeadIndex % width
    const colPosition = Math.floor(currentHeadIndex / width)
    if (colPosition <= 0 || colPosition === width -1) {
        gameOver = true
    }
    if (rowPosition <= 0 || rowPosition === width -1) {
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



function generateRandomNum() {
    return validCellIndexes[(Math.floor(Math.random() * validCellIndexes.length))]
}
function croissantAppears() {
    croissantIndex = generateRandomNum()
    cells[croissantIndex].classList.add("croissant")
}

function croissantIsEaten() {
    if (headIndex === croissantIndex) {
        cells[croissantIndex].classList.remove("croissant")
        croissantAppears()
    }
}



function restart() {
    location.reload()
}

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", function(e) { 
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) 
        {e.preventDefault();}
}, false);

document.addEventListener("keydown", (event) => {
    lastKeyDown = event.key;
})

playAgainBtnEl.addEventListener("click", restart)