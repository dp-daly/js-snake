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
    //gameMessageEl.classList.add("hidden")
    autoMove()
    render()
}

init();
croissantAppears();
setTimeout(speedUpSnake, 20000)

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
        snakePosition.pop();}
    headIndex = snakePosition[0]
    snakePosition.unshift(headIndex + direction)
    currentHeadIndex = snakePosition[0]
    currentBodyIndex = snakePosition.slice(1)
    console.log("currentHeadIndex: ", currentHeadIndex)
    console.log("currentBodyIndex: ", currentBodyIndex)
    //Can we dynamically remove sprite class instances from the static validCellIndexes array? 
    selfHit();
    solidWalls();
    croissantIsEaten();
    render();
}

//Minor glitch: the new intervals are forcing the snake to move after gameOver
function speedUpSnake() {
    clearInterval(timer)
    timer = setInterval(() => {
        moveSnake({key: lastKeyDown})
    }, 300)

    setTimeout(() => {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 250)
    }, 10000)

    setTimeout(() => {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 200)
    }, 30000)

    setTimeout(() => {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 150)
    }, 60000)

    setTimeout(() => {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 100)
    }, 90000)

    setTimeout(() => {
        clearInterval(timer)
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 50)
    }, 200000)
}


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


function generateRandomNum() {
    return validCellIndexes[(Math.floor(Math.random() * validCellIndexes.length))]
}
function croissantAppears() {
    croissantIndex = generateRandomNum()
    cells[croissantIndex].classList.add("croissant")
}

function croissantIsEaten() {
    if (headIndex === croissantIndex) {
        //disappear
        cells[croissantIndex].classList.remove("croissant")
        //respawn
        croissantAppears()
    }
}


/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener("keydown", (event) => {
    lastKeyDown = event.key;
})