function func() {
    var ok = window.getComputedStyle(document.getElementById("omg"), null).display;
    if(document.getElementById("omg").classList.contains('active')) {
    document.getElementById("omg").classList.remove('active');
    }
    else {
        document.getElementById("omg2").classList.remove('active');
        setTimeout(() => {  document.getElementById("omg").classList.add('active'); }, 200);
        
    }
    
}

function show_snake() {
    
    var ok = window.getComputedStyle(document.getElementById("snake_w"), null).display;
    if(document.getElementById("snake_w").classList.contains('active')) {
    document.getElementById("snake_w").classList.remove('active');
    }
    else {
        //document.getElementById("omg2").classList.remove('active');
        setTimeout(() => {  document.getElementById("snake_w").classList.add('active'); }, 200);
        
    }
    
}

function func2() {
    var ok = window.getComputedStyle(document.getElementById("omg2"), null).display;
    if(document.getElementById("omg2").classList.contains('active')) {
    document.getElementById("omg2").classList.remove('active');
    }
    else {
    document.getElementById("omg").classList.remove('active');
    setTimeout(() => {      document.getElementById("omg2").classList.add('active');
 }, 200);
    }
    
}


//////////////////////////////////////////SNAKE////////////////////////

//board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;
var points = -1;

//snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food




window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    
    
    placeFood();
    
    document.addEventListener("keyup", changeDirection);
    
    setInterval(update, 1000/5);
}

function update() {
    
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    
    if(snakeX >= 20 * blockSize){
        restart();
        window.alert("game over");
    }
    if(snakeY >= 20 * blockSize){
        restart();
        window.alert("game over");
    }
    if(snakeX <= -1 * blockSize){
        restart();
        window.alert("game over");
    }
    if(snakeY <= -1 * blockSize){
        restart();
        window.alert("game over");
    }
    
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        
        placeFood();
        
    }
    
    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    context.fillStyle="lime";
    snakeX +=velocityX * blockSize;
    snakeY +=velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for ( let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            restart();
            window.alert("game over");
        }
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
    
    
}

function restart(){
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    snakeX = 5 * blockSize;
    snakeY = 5 * blockSize;
    placeFood();
    points = 0;
    
}

function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code == "Space") {
        velocityX = 0;
        velocityY = 0;
    }
}

function placeFood() {
    
    var pair = getRandomPairsExcluding(snakeBody);
    foodX = pair[0];
    foodY = pair[1];
        
    
    points++;
    document.getElementById("Points").innerHTML = points;

    
}

function getRandomPairsExcluding(excludedPairs) {
  

  function isPairExcluded(pair) {
    return excludedPairs.some(excludedPair =>
      (excludedPair[0] === pair[0] && excludedPair[1] === pair[1])
    );
  }

  while (1) {
    var pair = [Math.floor(Math.random()* cols) * blockSize, Math.floor(Math.random() * rows) * blockSize];

    if (!isPairExcluded(pair)) {
      return pair;
    }
  }

  
}
