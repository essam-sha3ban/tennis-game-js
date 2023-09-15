
let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d")
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY =4;

let player1Score=0;
let player2Score=0;
let winningScore=3;
var shoeWinScreen = false

let framePerSecond = 30;

let paddle1Y=250;
let paddle2Y=250;
let paddleHeight=100
let paddleTackiness=10

function calculateMousePos(event){
    let rect =canvas.getBoundingClientRect();
    let root =document.documentElement;
    let mouseX =event.clientX - rect.left - root.scrollLeft
    let mouseY =event.clientY - rect.top - root.scrollTop

return {
   x:mouseX,
   y:mouseY
}
}


setInterval(callBoth , 1000 / framePerSecond);

function handleMouseClick(){
if(shoeWinScreen){
    player1Score=0;
    player2Score=0;
    shoeWinScreen=false
}
}

canvas.addEventListener("mousedown",handleMouseClick)

canvas.addEventListener("mousemove",function(eve){
let mousePos=calculateMousePos(eve);
paddle1Y =mousePos.y - (paddleHeight / 2)

})


function callBoth(){
    moveEverything();
    drawEverything();

}

function ballRest(){
    if(player1Score >= winningScore || player2Score >= winningScore){
    
        shoeWinScreen=true;
    
    }
    ballSpeedX = -ballSpeedX
    ballX =canvas.width / 2;
    ballY = canvas.height / 2;
}

function computerMoving(){
    var paddle2YCenter = paddle2Y + (paddleHeight / 2)
    if(paddle2YCenter < ballY-35){
       paddle2Y += 6
    }
    else if(paddle2YCenter > ballY+35){
        paddle2Y -= 6
    }
}

function moveEverything(){

    if(shoeWinScreen == true){
        return
    }
    computerMoving()

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX > canvas.width){

        if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight){
            ballSpeedX = -ballSpeedX

          //  var deltaY=ballY - (paddle1Y + paddleHeight / 2)
           //ballSpeedY = deltaY * 0.35
        }
            else{ 
                player1Score ++
                ballRest()
            }
    }
    if(ballX < 0){

        if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight){
        ballSpeedX = -ballSpeedX

        
        //var deltaY=ballY - (paddle2Y + paddleHeight / 2)
        //ballSpeedY = deltaY * 0.35
        }
        else{
            player2Score ++
            ballRest()          
        }     
    }

    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY
    }
    if(ballY < 0){
        ballSpeedY = -ballSpeedY
    }
  
}

function drawLine(){
    for(let  i=0 ; i<canvas.height ;i+=40){

        colorRect(canvas.width/2-1,i,2,20 , "white")

    }
}

function drawEverything(){
 
    
colorRect(0 ,0 ,canvas.width , canvas.height , "black")
drawLine();
if(shoeWinScreen){

    if(player1Score >= winningScore){
        canvasContext.fillStyle='white'
        canvasContext.fillText("left is win !" ,400 ,200)
       
   
    }
    else if(player2Score >= winningScore){
        canvasContext.fillStyle='white'
        canvasContext.fillText("Right is win !" ,400 ,200)
       
   
    }
    canvasContext.fillStyle='white'
    canvasContext.fillText("click to continue" ,400 ,300)
    return
}
colorRect(0 ,paddle1Y ,paddleTackiness , paddleHeight , "white");
colorRect(canvas.width -paddleTackiness ,paddle2Y ,paddleTackiness , paddleHeight , "red");

colorCircle(ballX ,ballY , paddleTackiness, "white")

canvasContext.fillText(player1Score ,100 ,100)
canvasContext.fillText(player2Score ,canvas.width-100 ,100)


}

function colorCircle(centerX ,centerY , radius ,drawColor){
    canvasContext.fillStyle=drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX ,centerY ,radius ,0 ,Math.PI*2 ,true);
    canvasContext.fill()
}

function colorRect(leftX , topY , width , hight , drawColor){
 
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect (leftX , topY , width , hight)
}