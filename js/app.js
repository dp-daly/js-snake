/*-------------------------------- Constants --------------------------------*/

//No need to dynamically create grass for MVP
const cells = document.querySelectorAll('.grass div')
const width = 5

/*-------------------------------- Variables --------------------------------*/

let snakePosition = [12]
let gameOver

//We'll need a loop to place more than one part of the snake given that the
//grid array can only taken one index value - see whiteboard
cells[snakePosition].classList.add("sprite")

let timer
let lastKeyDown = "ArrowLeft"

/*------------------------ Cached Element References ------------------------*/




/*-------------------------------- Functions --------------------------------*/

function init() {
    autoMove()
    render()
}

init()

//! Win: I had to revise the logic because conditionals were not working and
//! required stacked events for one listener (which I'm not even sure is possible when trying
//! to make use of the event).
//! It turned out to be much easier to set the default value of the lastKeyDown variable
//! to the default direction, have that direction updated by the event, then have the 
//! interval take the value of lastKeyDown as its command. 
//Lesson to consider what variables you may have to hand to store default/dynamically created values
function autoMove() {
    timer = setInterval(() => {
        moveSnake({key: lastKeyDown})
    }, 1000)
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

document.addEventListener('keydown', (event) => {
    lastKeyDown = event.key;
})