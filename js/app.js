/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div")
const width = 5

/*-------------------------------- Variables --------------------------------*/

const snakePosition = [12, 13, 14, 15]
//desired: 7, 12, 13
//actual: 7, 14, undefined
// with minus 1 after recalling the index, we have the desired output
// this is not replacing the position in the chain though... 
let gameOver

//! Next thing to try is storing the value of the if and using it for the moving of indexes..
//! which iteration method can do that?

// Next to try is centring on snake's head and storing previous position if possible

let headIndex = snakePosition[0]
let neckIndex = snakePosition[1]

snakePosition.forEach((num, index, snakePosition) => {
    if (headIndex) {
        headIndex = num - width
    } else if (neckIndex) {
        neckIndex = headIndex - width
    } else { 
        snakePosition[index] = snakePosition[index+1]
}})
console.log(snakePosition)

// This doesn't work.

// ! .forEach()
// snakePosition.forEach((num, index, snakePosition) => {
//     if (index === 0) {
//         snakePosition[index] = num - width;
//     } else {
//         snakePosition[index] = snakePosition[index] - 1
//     }
// })
//console.log(snakePosition)


// ! .map()
// const newPosition = snakePosition.map((num, index) => {
//     if (index === 0) {
//         return num - width;
//     }  
//     if (index !== 0) {
//         return snakePosition[index] - 1
//     }
// })

// console.log(newPosition)

// ! Decrementing:
// for (let i = snakePosition.length - 1; i > 0; i--) {
//     snakePosition[i] = snakePosition[i-1];
//         if (i === 0) {
//             snakePosition[i] = snakePosition[i] - width;
//         }
// }

// console.log(snakePosition)

//Sets default movement with interval, which is later altered in the autoMove function
let timer
let lastKeyDown = "ArrowLeft"

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

// const testArray = [10, 11, 12, 13, 14]
// const newDirection = testArray.map((num, index) => {
//     if (index === 0) {
//         return num - width
//     }
//     if (index !== 0) {
//         return testArray[index + 1]
//     }
// })


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


