//변수
var canvas = document.getElementsByTagName("canvas")[0];

var ctx = canvas.getContext("2d");
var ctx1 = canvas.getContext("2d");
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

var br = 3; //줄
var bc = 5; //열
var bw = 75; //넓이
var bh = 20; //높이
var bp = 10; //사이간격
var bTop = 30; //상단간격
var bLeft = 30; //왼쪽 간격
var score = 0; //점수

//블럭변수
var bricks = [];
for(var c=0; c<bc; c++) {
    bricks[c] = [];
    for (var r = 0; r<br; r++) {
       bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//이벤트 리스너
//addEventListener(이벤트, 함수명)
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//키 눌림 함수
function keyDown(e) {
     if(e.key == "ArrowRight") {//눌러졌다면
        rPressed = true; //true로 변경
    }
    else if(e.key == "ArrowLeft") {//눌러졌다면
        lPressed = true; //true로 변경
    }
}

//키 해제 함수
function keyUp(e) {
    if(e.key == "ArrowRight") {//눌러졌다면
        rPressed = false; //false로 변경
    }
    else if( e.key == "ArrowLeft") {//눌러졌다면
        lPressed = false; //false로 변경
    }
}

//패달 충돌 처리 함수
function colCheck() {
   for (var c = 0; c < bc; c++) {
      for (var r = 0; r < br; r++) {
           var b = bricks[c][r];
           if (b.status == 1) { //status 변수가 1에서 0으로 바뀔때 공도 방향을 바꿈
              if (x > b.x && x < b.x + bw && y > b.y && y <b.y + bh) {
                 dy = -dy; //방향 전환
                 b.status = 0; //status를 0으로
                 score++; //점수증가
                 if(score == br*bc) { //점수랑 블럭의 갯수랑 같다면
                   alert("미션 성공!, 축하합니다^^"); 
                   document.location.reload(); //새로고침                     
               }
           }
       }
    }
  }
}

//볼을 생성하는 함수
function drawBall() {
    ctx.beginPath();
    ctx1.arc(y, x, ballSize, 0, Math.PI*2)
    ctx.arc(x, y, ballSize, 0, Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}

//패달을 생성하는 함수
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(px, canvas.height-pHeight, pWidth, pHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

//블럭을 생성하는 함수
function drawBricks() {
    for(var c=0; c<bc; c++) {
      for(var r=0; r<br; r++) {
        if(bricks[c][r].status == 1) { //status변수는 0이되면 화면에서 사라지게 하기위해 생성
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

//점수 함수
function drawScore() {
   ctx.font = "20px 고딕";
   ctx.fillStyle = "green";
   ctx.fillText("점수: "+score*10, 10, 20);
}

//공이 두개가 되는 함수
function twoball(){

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
    if(y + dy < ballSize) { //상단벽일 경우 방향을 바꿈
        dy = -dy; //방향 전환
    }
    else if(y + dy > canvas.height-ballSize) { //위쪽 벽이나  아래쪽 벽에 부딪치면
        if(x > px && x < px + pWidth) { //패들안에 들어가면
                dy = -dy; //방향전환
        }
        else {
            alert("게임 종료");
            document.location.reload(); //새로고침
            clearInterval(interval); //진행중인 interval을 없애줌
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