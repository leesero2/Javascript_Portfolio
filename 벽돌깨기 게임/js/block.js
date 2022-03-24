var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var ballSize= 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var pHeight = 15;
var pWidth = 80;
var px = (canvas.width-pWidth)/2;
var rPressed = false;
var lPressed = false;
var br = 3;
var bc = 5;
var bw = 75;
var bh = 20;
var bp = 10;
var bTop = 30;
var bLeft = 30;
var score = 0;

var bricks = [];
for(var c=0; c<bc; c++) {
    bricks[c] = [];
    for (var r = 0; r<br; r++) {
       bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(e) {

     if(e.key == "ArrowRight") {
        rPressed = true;
    }
    else if(e.key == "ArrowLeft") {
        lPressed = true;
    }
}

function keyUp(e) {
    if(e.key == "ArrowRight") {
        rPressed = false;
    }
    else if( e.key == "ArrowLeft") {
        lPressed = false;
    }
}

function colCheck() {
   for (var c = 0; c < bc; c++) {
      for (var r = 0; r < br; r++) {
           var b = bricks[c][r];
           if (b.status == 1) {
              if (x > b.x && x < b.x + bw && y > b.y && y <b.y + bh) {
                 dy = -dy;
                 b.status = 0;
                 score++;
                 if(score == br*bc) {
                   alert("미션 성공!, 축하합니다^^");
                   document.location.reload();                      
               }
           }
       }
    }
  }
}
   
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(px, canvas.height-pHeight, pWidth, pHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<bc; c++) {
      for(var r=0; r<br; r++) {
        if(bricks[c][r].status == 1) {
          var bx = (c*(bw+bp))+bLeft;
          var by = (r*(bh+bp))+bTop;
          bricks[c][r].x = bx;
          bricks[c][r].y = by;
          ctx.beginPath();
          ctx.rect(bx, by, bw, bh);
          ctx.fillStyle = "#DF3A01";
          ctx.fill();
          ctx.closePath();
          }
      }
  }
}

function drawScore() {
   ctx.font = "20px 고딕";
   ctx.fillStyle = "green";
   ctx.fillText("점수: "+score*10, 10, 20);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    colCheck();
    drawScore();
    
    if(x + dx > canvas.width-ballSize || x + dx < ballSize) {
        dx = -dx;
    }
    if(y + dy < ballSize) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballSize) {
        if(x > px && x < px + pWidth) {
                dy = -dy;
        }
        else {
            //alert("게임 종료");
            //document.location.reload(); 
            clearInterval(interval);
        }
    }
    
    if(rPressed && px < canvas.width-pWidth) {
        px += 7;
    }
    else if(lPressed && px >0) {
        px -= 7;
    }
    
    x += dx;
    y += dy;
}

var interval = setInterval(update, 10);