////////        MAIN FUNCTIONS          ///////////////            

function change_visibility_aboutme() {
    
    if(document.getElementById("ABOUTME_ID").classList.contains('active')) {
    document.getElementById("ABOUTME_ID").classList.remove('active');
    }
    else {
        document.getElementById("PROJECTS_ID").classList.remove('active');
        setTimeout(() => {  document.getElementById("ABOUTME_ID").classList.add('active'); }, 200);
        
    }
    
}

function change_visibility_snake() {
    if(document.getElementById("SNAKE_WINDOW").classList.contains('active')) {
    document.getElementById("SNAKE_WINDOW").classList.remove('active');
    document.getElementsByTagName("body")[0].style = "overflow: visible";
    }
    else {
        //document.getElementById("omg2").classList.remove('active');
        setTimeout(() => {  document.getElementById("SNAKE_WINDOW").classList.add('active'); }, 200);
        setTimeout(() => {  document.getElementsByTagName("body")[0].style = "overflow: hidden"; }, 200);
        
        
    }
    
}
function change_visibility_chests() {
    if(document.getElementById("CHESTS_WINDOW").classList.contains('active')) {
    document.getElementById("CHESTS_WINDOW").classList.remove('active');
    }
    else {
        
        document.getElementById("SNAKE_WINDOW").classList.remove('active');
        setTimeout(() => {  document.getElementById("CHESTS_WINDOW").classList.add('active'); }, 200);  
    }
    
}

function change_visibility_projects() {
    if(document.getElementById("PROJECTS_ID").classList.contains('active')) {
    document.getElementById("PROJECTS_ID").classList.remove('active');
    }
    else {
    document.getElementById("ABOUTME_ID").classList.remove('active');
    setTimeout(() => {      document.getElementById("PROJECTS_ID").classList.add('active');
 }, 200);
    }
    
}


////////        SNAKE             /////////////// 

//board

var SNAKE_blockSize = 20;
var SNAKE_rows = 20;
var SNAKE_cols = 20;
var SNAKE_board;
var SNAKE_context;
var SNAKE_points = -1;

//snake

var SNAKE_X = SNAKE_blockSize * 5;
var SNAKE_Y = SNAKE_blockSize * 5;
var SNAKE_velocityX = 0;
var SNAKE_velocityY = 0;
var SNAKE_Body = [];






window.onload = function(){
    SNAKE_board = document.getElementById("SNAKE_BOARD");
    SNAKE_board.height = SNAKE_rows * SNAKE_blockSize;
    SNAKE_board.width = SNAKE_cols * SNAKE_blockSize;
    SNAKE_context = SNAKE_board.getContext("2d");
    
    
    SNAKE_placeFood();
    
    document.addEventListener("keyup", SNAKE_changeDirection);
    
    setInterval(SNAKE_update, 1000/5);
}

function SNAKE_update() {
    
    SNAKE_context.fillStyle = "black";
    SNAKE_context.fillRect(0, 0, SNAKE_board.width, SNAKE_board.height);
    
    
    if(SNAKE_X >= 20 * SNAKE_blockSize){
        SNAKE_restart();
        window.alert("game over");
    }
    if(SNAKE_Y >= 20 * SNAKE_blockSize){
        SNAKE_restart();
        window.alert("game over");
    }
    if(SNAKE_X <= -1 * SNAKE_blockSize){
        SNAKE_restart();
        window.alert("game over");
    }
    if(SNAKE_Y <= -1 * SNAKE_blockSize){
        SNAKE_restart();
        window.alert("game over");
    }
    
    SNAKE_context.fillStyle = "red";
    SNAKE_context.fillRect(foodX, foodY, SNAKE_blockSize, SNAKE_blockSize);
    
    if(SNAKE_X == foodX && SNAKE_Y == foodY){
        SNAKE_Body.push([foodX, foodY]);
        
        SNAKE_placeFood();
    }
    
    for (let i = SNAKE_Body.length-1; i > 0; i--){
        SNAKE_Body[i] = SNAKE_Body[i-1];
    }
    if(SNAKE_Body.length) {
        SNAKE_Body[0] = [SNAKE_X, SNAKE_Y];
    }
    
    SNAKE_context.fillStyle="lime";
    SNAKE_X +=SNAKE_velocityX * SNAKE_blockSize;
    SNAKE_Y +=SNAKE_velocityY * SNAKE_blockSize;
    SNAKE_context.fillRect(SNAKE_X, SNAKE_Y, SNAKE_blockSize, SNAKE_blockSize);
    
    for ( let i = 0; i < SNAKE_Body.length; i++) {
        if(SNAKE_X == SNAKE_Body[i][0] && SNAKE_Y == SNAKE_Body[i][1]){
            SNAKE_restart();
            window.alert("game over");
        }
        SNAKE_context.fillRect(SNAKE_Body[i][0], SNAKE_Body[i][1], SNAKE_blockSize, SNAKE_blockSize);
    }
    
    
    
}

function SNAKE_restart(){
    SNAKE_velocityX = 0;
    SNAKE_velocityY = 0;
    SNAKE_Body = [];
    SNAKE_X = 5 * SNAKE_blockSize;
    SNAKE_Y = 5 * SNAKE_blockSize;
    SNAKE_placeFood();
    SNAKE_points = 0;
    document.getElementById("Points").innerHTML = SNAKE_points;
}

function SNAKE_changeDirection(e) {
    if(e.code == "ArrowUp" && SNAKE_velocityY != 1) {
        SNAKE_velocityX = 0;
        SNAKE_velocityY = -1;
    }
    else if(e.code == "ArrowDown" && SNAKE_velocityY != -1) {
        SNAKE_velocityX = 0;
        SNAKE_velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && SNAKE_velocityX != 1) {
        SNAKE_velocityX = -1;
        SNAKE_velocityY = 0;
    }
    else if(e.code == "ArrowRight" && SNAKE_velocityX != -1) {
        SNAKE_velocityX = 1;
        SNAKE_velocityY = 0;
    }
    else if(e.code == "Space") {
        SNAKE_velocityX = 0;
        SNAKE_velocityY = 0;
    }
}

function SNAKE_placeFood() {
    var pair = SNAKE_getRandomPairsExcluding(SNAKE_Body);
    
    foodX = pair[0];
    foodY = pair[1];
        
    SNAKE_points++;
    document.getElementById("Points").innerHTML = SNAKE_points;
}

function SNAKE_getRandomPairsExcluding(excludedPairs) {
    function isPairExcluded(pair) {
        return excludedPairs.some(excludedPair => (excludedPair[0] === pair[0] && excludedPair[1] === pair[1]));
    } 

    while (1) {
        var pair = [Math.floor(Math.random()* SNAKE_cols) * SNAKE_blockSize, Math.floor(Math.random() * SNAKE_rows) * SNAKE_blockSize];

        if (!isPairExcluded(pair)) {
            return pair;
        }
    } 
}
