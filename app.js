const canvasContainer=document.getElementById("canvas-container")
const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")
canvas.height=400
canvas.width=canvas.height
var speed=5
var tileCount=20
var tileSize=20
var headX=10
var headY=10
var speedX=0
var speedY=0
var appleX=5
var appleY=5
const snakeParts=[]
var tailLength=2
var score=1
var scorePositionX=canvas.width-65

class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
function drawGame(){
    changeSnakePosition()
    let result=isGameover()
    if(result){
        return
    }
    clearScreen()
    checkAppleCollision()
    drawapple()
    drawSnake()
    drawScore()
    setTimeout(drawGame,1000/speed)
}
function isGameover(){
    let gameover=false
    if(speedX==0 && speedY==00){
        return gameover
    }
    if(headX<0){
        gameover=true
    }
    else if(headX>=tileSize){
        gameover=true
    }
    else if(headY>=tileSize){
        gameover=true
    }
    else if(headY<0){
        gameover=true
    }
    for(let i=0;i<snakeParts.length;i++){
        if(snakeParts[i].x==headX && snakeParts[i].y==headY){
            gameover=true
        }
    }
    if(gameover){
        ctx.fillStyle="white"
        ctx.font="50px Verdana"
        ctx.fillText("Game Over!",canvas.width/8,canvas.height/2)
    }
    return gameover
}
function drawScore(){
    ctx.fillStyle="white"
    ctx.font="15px Verdana"
    ctx.fillText("Score:"+score,scorePositionX-score.toString().length*7,15)
}
function clearScreen(){
    ctx.fillStyle="black"
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
function drawSnake(){
    ctx.fillStyle="green"
    snakeParts.push(new SnakePart(headX,headY))
    for(let i=0;i<snakeParts.length;i++){
        ctx.fillRect(snakeParts[i].x*tileCount,snakeParts[i].y*tileCount,tileSize,tileSize)
    }
    // snakeParts.push(new SnakePart(headX,headY))
    if(snakeParts.length>tailLength){
        snakeParts.shift()
    }
    ctx.fillStyle="yellow"
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize)
}
function changeSnakePosition(){
    headX=headX+speedX
    headY=headY+speedY
}
function drawapple(){
    ctx.fillStyle="red"
    ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize)
}
function checkAppleCollision(){
    if(headX==appleX && headY==appleY){
        appleX=Math.floor(Math.random()*tileCount)
        appleY=Math.floor(Math.random()*tileCount)
        tailLength++
        score++
    }
}
document.body.addEventListener("keydown",function(e){
    //up
    if(e.keyCode==38){
        if(speedY==1)
            return;
        speedY=-1
        speedX=0
    }
    //down
    if(e.keyCode==40){
        if(speedY==-1)
            return;
        speedY=1
        speedX=0
    }
    //right
    if(e.keyCode==39){
        if(speedX==-1)
            return;
        speedY=0
        speedX=1
    }
    //left
    if(e.keyCode==37){
        if(speedX==1)
            return;
        speedY=0
        speedX=-1
    }

})
drawGame()