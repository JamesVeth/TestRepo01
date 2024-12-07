const gameArea = document.getElementById('gameArea');
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const labelScore = document.getElementById('labelScore');
const buttonReset = document.getElementById('buttonReset');

// Starting variables
let gameRunning = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

// Static variables
const unitSize = 25;
const gameWidth = gameCanvas.getWidth;
const gameHeight = gameCanvas.getHeight;
const appleColor = "red";
const snakeColor = "lightgreen";
const backgroundColor = "lightgrey";
const snakeBorder = "black";

// Start the Event Listeners (which esesentially run in a type of thread, continuously)
buttonReset.addEventListener("click", gameStart);
gameCanvas.addEventListener("keydown", changeDirection);

// Start the game
gameStart();

let snake = [ // this is an array, that consists of 5 objects to start
    {x:unitSize*4,y:0}, // this is the head, at snake [0]
    {x:unitSize*3,y:0}, // the 
    {x:unitSize*2,y:0},
    {x:unitSize*1,y:0},
    {x:0,y:0}
]

ctx.fillStyle = "lightgreen";
ctx.fillRect(0,0,gameCanvas.clientWidth,gameCanvas.clientHeight);

function createFood(){
    foodX = randomFood(0, gameWidth-unitSize); // 0 - 475
    foodY = randomFood(0, gameWidth-unitSize); // 0 - 475
}

function randomFood(min, max) {

    // 0.4 * 475 = 190
    // 190 / 25 = 7.6
    // Round 7.6; round means the lowest, closest integer, which is 7
    // 7 * 25 = 175
    // So we draw at 175, which is a divisible of 25, so the piece doesn't overlap

    let randNum = Math.round((Math.random() * (max - unitSize) / unitSize)) * unitSize;
    return randNum;

}

function gameStart(){
    
    gameRunning = true;
    labelScore.textContent = score;
    createFood();
    nextTick();

}


function resetGame(){
    score = 0;
    snake = {x:unitSize*4,y:0},
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize*1,y:0},
    {x:0,y:0};
    xVelocity = unitSize;
    yVelocity = 0;
}

function checkGameOver() {

}

function drawFood(){

    ctx.fillStyle(appleColor);
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
    
}

function drawSnake(){
    
    ctx.fillStyle(appleColor);
    ctx.strokeStyle = snakeBorder;

    //foreach creates a temporary object, called snakeSegment, of each of the objects in snake, and does a ctx.fillRect using each of the object's coordinates.
    snake.forEach(snakeSegment=>{
        ctx.fillRect(snakeSegment.x, snakeSegment.y, unitSize, unitSize);
        ctx.strokeRect(snakeSegment.x, snakeSegment.y, unitSize, unitSize);
    });


}

function changeDirection(event) {

    const keyPressed = event.key;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);


    switch(true) {

        case (keyPressed == "ArrowUp" && !goingDown):
            yVelocity = -unitSize;
            break;
        
        case (keyPressed == "ArrowDown" && !goingUp):
            yVelocity = unitSize;
            break;
        
        case (keyPressed == "ArrowLeft" && !goingRight):
            xVelocity = -unitSize;
            break;
        
        case (keyPressed == "ArrowRight" && !goingLeft):
            xVelocity = unitSize;
            break;
        
    }   

}

function clearBoard(){

    ctx.fillStyle(backgroundColor);
    ctx.fillRect(0,0,ctx.clientWidth, ctx.clientHeight);

}

function nextTick(){
    if(running){
        // main game loop
        setTimeout(()=>{

            clearBoard(); // 1. Clear the board entirely before drawing the next frame
            drawFood(); // 2. Draw the food next, fillstyle and fillrect commands
            moveSnake(); // 3. Move the snake and determine if it has eaten or not, if it doesn't you pop the last snake part
            drawSnake(); // 4. Simple draw snake function, fillstyle and fillrect commands
            checkGameOver(); // 5. Check if the snake has collided with its self or the boundaries
            nextTick(); // 6. <--------- Recursively call this same function, which cycles the game loop, until running == false.
        }, 75); // 7. Pause for 75ms, before running this again

    } else {
        displayGameOver(); // If the game isn't running, it's in a game over state
    } 
}

function moveSnake(){

    const head = {x:snake[0].x + xVelocity,
        y:snake[0].y + yVelocity};

        
        
        /*
         Array Functions

         shift - remove the first 0 position item of array and return the value
         pop - remove the last position item of array and return the value
         unshift - add 1 item to the first 0 position of array and return new length of array
         push - add 1 item to the last position of array and return new length of array

         Note that shift and pop return the value, which was popped and shifted; the idea is we are subtracting those
         and storing them temporarily
         while unshift and push return the new length of the array

         LIFO - Last in first out
         FIFO - First in first out
        */
        
    
}

function displayGameOver(){

    clearBoard();
    ctx.fillStyle(appleColor);
    
}