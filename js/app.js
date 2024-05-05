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

// const testArray = [10, 11, 12, 13, 14]
// desired result: [5, 10, 11, 12, 13]

// const newDirection = testArray.map((num, index) => {
//     if (index === 0) {
//         return num - width
//     }
//     if (index !== 0) {
//         return num -1
//     }
// })

// console.log(newDirection)

//secondTest - coming from the left

//Snake's head is at 13 and it wants to go up to 8

//! Previous mostly successful test
// const testArray = [13, 12, 11, 10]
// //desired result: [8, 13, 12, 11]

// const newDirection = testArray.map((num, index) => {
//     if (index === 0) {
//         return num - width;
//     }
//     // if (index === testArray.length - 1) {
//     //     return num + 1
//     // }
//     if (index !== 0 && testArray[index +1] < num) {
//         return num +1;
//     } else {
//         return num -1;
//     }
// })

//returns: [8, 13, 12, 9]
//The condition takes 13 and minuses 5 to get 8;
//It takes 12 and pluses 1 to get 13
//It takes 11 and pluses 1 to get 12
//Then it takes 10, it can't check the condition so it minuses 1 (the else statement)
//Need to add new condition at start to apply to final position in test
//Added, and now there is the issue of differentiating that part of the rule still for left and right. 
//We would need to use a forLoop if we wanted to limit the effect on the final number, but we'll still need it to either plus or minus. 

//For loop test:
// const testArray = [13, 12, 11, 10]
const testArray = [10, 11, 12, 13, 14]

let newDirection = []

for (let i = 0; i < testArray.length; i++) {
    if (i === 0) {
        newDirection.push(testArray[0] - width);
    } else {
        if (testArray[i] > testArray[i +1]) {
            newDirection.push(testArray[i] + 1);
        } else {
            newDirection.push(testArray[i] - 1);
        }
    }
}

//Same issue, we need to be able to add in another condition to deal with the last index. 
//Options: 
// 1: food logic will also need to know whether or not to add an index of higher or lower than the value of the current final index -- so think of a global scope solution that can be drawn on later.
//  


//You would have to have a way of js knowing that the snake is coming from the right and therefore needs to be +1 instead of -1
//Consider how to do this in a way that is relative to the info you already have

console.log(newDirection)