/*-------------------------------- Constants --------------------------------*/

//No need to dynamically create grass for MVP
const cells = document.querySelectorAll('.grass div')
const width = 5

/*-------------------------------- Variables --------------------------------*/

let snakePosition = [12]
let timer //place timer in global scope to update it from multiple functions
let gameOver

cells[snakePosition].classList.add("sprite")

/*------------------------ Cached Element References ------------------------*/




/*-------------------------------- Functions --------------------------------*/

function init() {
    autoMove()
    render()
}

init()

//Next functionality: the snake has to continue in the direction of the input
// ...There will need to be logic within setInterval that takes the last input 
// direction and continues 'pushing the key' until another direction is chosen.
function autoMove() {
    timer = setInterval(() => {
        moveSnake({key: "ArrowLeft"})
    }, 1000)
    //If arrow key pushed, set interval must continue to moveSnake in that
    //direction
    If 
    //Should I pass a new event to autoMove or consider how to do the conditional
    //logic in moveSnake? But I think it would mean I would have to create a new 
    //interval, which can be tricky.
}

function render() {
    cells.forEach((cell, index) => {
        cells[index].classList.remove("sprite")
    })
    cells[snakePosition].classList.add("sprite")
}

function moveSnake(event) {
    if (event.key === "ArrowUp") {
        snakePosition = snakePosition - width
    } else if (event.key === "ArrowDown") {
        snakePosition = snakePosition + width
    } else if (event.key === "ArrowLeft") {
        snakePosition = snakePosition - 1
    } else if (event.key === "ArrowRight") {
        snakePosition = snakePosition + 1
    }
    render()
}

//Solid wall logic



/*----------------------------- Event Listeners -----------------------------*/

//Event helper function
function doubleEvent() {
    autoMove();
    moveSnake();
}

document.addEventListener('keydown', moveSnake)