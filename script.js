const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5;
let snakeY = 10;
let snakeBody = Array();
let velocityX = 0, velocityY = 0;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

const randomFoodPosition = () => {
    //creates random value between 0-30 for food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const initGame = () => {
    
    if(gameOver){
        return handleGameOver();
    }
    
    playBoard.innerHTML = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // checks if snake hit the food
    if(snakeX === foodX && snakeY === foodY){
        randomFoodPosition();
        snakeBody.push([foodX, foodY]); // pushes food position to snake body
        score++;

        if(score > highScore){
            highScore = score;
            localStorage.setItem("high-score", highScore);
        }
    }
    scoreElement.textContent = `Score: ${score}`;
    highScoreElement.textContent = `High Score: ${highScore}`;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    // setting first element of the body as current head position
    snakeBody[0] = [snakeX, snakeY];

    // updates snake's head position based on its velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // checking if the snake hit the wall, if so gameOver = true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        console.log("Game Over")
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {

        playBoard.innerHTML += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // checking if snake's head hit the body, if so gameOver = true
        if(i !== 0 && (snakeBody[0][1] === snakeBody[i][1]) && (snakeBody[0][0] === snakeBody[i][0])){
            gameOver = true;
        }
    }
}

const changeDirection = (e) => {
    // changes velocity value according to key press
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    initGame();
}

randomFoodPosition();
const setIntervalId = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection)