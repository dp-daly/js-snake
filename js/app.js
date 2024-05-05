/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
const width = 5

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [12, 13, 14]
let gameOver

//Sets default movement with interval, which is later altered in the autoMove function
let timer
let lastKeyDown = "ArrowLeft"

//Snakehead variable
let snakeHead

/*------------------------ Cached Element References ------------------------*/

const playAgainBtnEl = document.querySelector("#restart")
const gameMessageEl = document.querySelector("#message")

/*-------------------------------- Functions --------------------------------*/

function init() {
    gameOver = false
    playAgainBtnEl.classList.add("hidden")
    gameMessageEl.classList.add("hidden")
    autoMove()
    render()
}

init()


function autoMove() {
    timer = setInterval(() => {
        moveSnake({key: lastKeyDown})
    }, 1000)
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
    //To have snake appear in more than one cell, we have to loop through the array length and assign the direction to a variable (as in grid demo)
    snakePosition.forEach((bodyPart, index) => {
        snakePosition[index] = bodyPart + direction
    })
    //Render is called immediately following the move conditional logic
    render()
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



/*---- Testing ---*/ 

// ! Testing slither logic
// let snakePosition = [11, 12, 13] 
// with ONE move up after ONE interval, it should be [6, 11, 12]
// In that one loop, we should have  LOOP 1: snakePosition[index] = bodyParts - width (HEAD) 
//                                   LOOP2: snakePosition[index] = bodyParts -1 (Body)
//                                   LOOP3: snakePosition[index] = bodyParts -1 (End)


// Next consideration: This has to work both if the snake is coming from the right and left. 


//Rather than differentiating between body and end...  
//Each unit has to take the position of the previous unit and the final one has to be removed

// Going up:
// Head needs to be able to go up one and rather than the tail staying behind
// each element needs to be able to take the position of the previous one.. 

// [10, 11, 12, 13, 14]
// [5, 10, 11, 12, 13] 

// Test with arrays and think about embedding in rest of code later.

// Going right:
// Now the snake turns right..

// [6, 5, 10, 11, 12]
// [7, 6, 5, 10, 11]
// [8, 7, 6, 5, 10]

// Going up:
// Now the snake goes up again..
// [3, 8, 7, 6, 5]

const testArray = [10, 11, 12, 13, 14]

const newDirection = testArray.map((num, index) => {
    if (index === 0) {
        return num - width
    }
    if (index !== 0) {
        return num -1
    }
})

console.log(newDirection)