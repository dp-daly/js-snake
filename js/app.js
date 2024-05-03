// Early testing, experimenting with a 2D array in another file 
// (commit for logic graveyard)

let grass = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
]

snake = {
    body: ["S", "S", "S"],
    position: { y: 2, x: 2 }
}

grass[snake.position.y][snake.position.x] = snake.body

//Two values given to position always give a horizontal position
//If we loop through the snake's length and give each iteration a coordinate, 
//e.g. grass[y: 2, x: 2]
//then increment the y axis by 1, e.g. grass[y: 3, x: 2]
//and again, e.g. grass[y: 4, x: 2]
for (let i = 0; i < snake.body.length; i++) {
    grass[snake.position.y + i][snake.position.x] = snake.body[i];
    console.log(grass)
    console.log("this is the y axis: " + snake.position.y + i + " and here's x: " + snake.position.x)
}

function goUp() {
    for (let i = 0; i < snake.body.length; i++) {
    grass[snake.position.y + 3][snake.position.x] = snake.body[i]
}
}
//but then you have to delete the final one... 

goUp()
console.log(grass)

//Next logic will show 1D approach with grid