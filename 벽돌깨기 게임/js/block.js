//변수
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

//블럭변수
var bricks = [];
for(var c=0; c<bc; c++) {
    bricks[c] = [];
    for (var r = 0; r<br; r++) {
       bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//이벤트 리스너
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

//볼을 나타내는 함수
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}

//패달을 나타내는 함수
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

//업테이트 함수
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //화면지우기
    drawBricks();
    drawBall(); //공 생성
    drawPaddle(); //패달 생성
    colCheck();
    drawScore();
    
    if(x + dx > canvas.width-ballSize || x + dx < ballSize) { //오른쪽 벽이나 왼쪽 벽에 부딪치면
        dx = -dx; //방향 전환
    }
    if(y + dy < ballSize) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballSize) { //위쪽 벽이나  아래쪽 벽에 부딪치면
        if(x > px && x < px + pWidth) {
                dy = -dy; //방향전환
        }
        else {
            // alert("게임 종료");
            // document.location.reload(); 
            // clearInterval(interval);
        }
    }
    
    if(rPressed && px < canvas.width-pWidth) {
        px += 7; //오른쪽으로 7 만큼 이동
    }
    else if(lPressed && px >0) {
        px -= 7; //왼쪽으로 7만큼 이동
    }
    //dx, dy가 2로 설정되어 있기때문에 인터벌인 10밀리세컨드당 대각선으로 움직임
    x += dx; //x좌표 변경
    y += dy; //y좌표 변경
}

var interval = setInterval(update, 10); //10밀리세컨드마다 update 함수를 실행