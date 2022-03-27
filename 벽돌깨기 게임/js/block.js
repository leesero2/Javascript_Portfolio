//변수
let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
let ballSize= 10; //볼 크기

let x = canvas.width/2;  //공의 x(가로) 좌표
let y = canvas.height-30;//공의 y(세로) 좌표

let x2 = canvas.width/2; //공의 x(가로) 좌표
let y2 = canvas.height-30; //공의 y(세로) 좌표

let dx = 2; //2로 설정을 해둬서 대각선으로 움직임
let dy = -2; //2로 설정을 해둬서 대각선으로 움직임

let dx2 = -1; //2로 설정을 해둬서 대각선으로 움직임

let pHeight = 15; //패들 높이
let pWidth = 80; //패들 넓이
let px = (canvas.width-pWidth)/2; //패들좌표 변수,좌표는 (화면 - 패들높이)/2를 사용

let rPressed = false;
let lPressed = false;

let br = 3; //줄
let bc = 5; //열
let bw = 75; //넓이
let bh = 20; //높이
let bp = 10; //사이간격
let bTop = 30; //상단간격
let bLeft = 30; //왼쪽 간격
let score = 0; //점수

let life = 5; //목숨


//블럭변수
let bricks = [];
for(let c=0; c<bc; c++) {
    bricks[c] = [];
    for (let r = 0; r<br; r++) {
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
   for (let c = 0; c < bc; c++) {
      for (let r = 0; r < br; r++) {
           let b = bricks[c][r];
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

function lifeC(){

}


//볼을 생성하는 함수
function drawBall() {
    ctx.beginPath(); //beginPath() : 도형을 그리기전에 꼭 먼저 선언
    //ctx1.arc(y, x, ballSize, 0, Math.PI*2)
    ctx.arc(x, y, ballSize, 0, Math.PI*2) //원을 그리려면 arc를 사용해야함
    //주의 : 호나 원을 그리기위해서는 arc() 혹은 arcTo() 메소드를 사용
    //예시 - arc(x, y, radius, startAngle, endAngle, anticlockwise)
    //(x, y) 위치에 원점을 두면서, 반지름 r을 가지고,  startAngle 에서 시작하여 endAngle 에서 끝나며 주어진 anticlockwise 방향으로 향하는 (기본값은 시계방향 회전) 호를 그리게 됨.

    ctx.fillStyle = "orange";
    ctx.fill(); //경로의 내부를 채워서 내부가 채워진 도형을 그림
    ctx.closePath(); //closePath() : 다 그렸으면 마지막에 꼭 선언
}

//볼을 여러개 생성하는 함수
function drawBall2() {
    ctx.beginPath(); //beginPath() : 도형을 그리기전에 꼭 먼저 선언
    //ctx.arc(x2, y2, ballSize, 0, Math.PI*2)
    ctx.arc(x2, y, ballSize, 0, Math.PI*2) //원을 그리려면 arc를 사용해야함
    ctx.fillStyle = "red";
    x2 += dx2; //게임을 시작할때 공이 왼쪽으로 움직임
    ctx.fill(); //경로의 내부를 채워서 내부가 채워진 도형을 그림
    ctx.closePath(); //closePath() : 다 그렸으면 마지막에 꼭 선언

    //패달을 밟았을때 튕겨져 나가는 함수
    if(y + dy > canvas.height-ballSize) { //위쪽 벽이나  아래쪽 벽에 부딪치면
        if(x2 > px && x2 < px + pWidth) { //패들안에 들어가면 + && x2 > px && x2 < px + pWidth 이걸 추가해서 두번째 공 기능도 넣음
                dy = -dy; //방향전환
        }
        else{
            //함수를 지우는 소스
        }
    }
    
}

//패달을 생성하는 함수
function drawPaddle() {
    ctx.beginPath(); //beginPath() : 도형을 그리기전에 꼭 먼저 선언
    ctx.rect(px, canvas.height-pHeight, pWidth, pHeight); //rect로 패들을 그림
    ctx.fillStyle = "blue";
    ctx.fill(); //경로의 내부를 채워서 내부가 채워진 도형을 그림
    ctx.closePath(); //closePath() : 다 그렸으면 마지막에 꼭 선언
}

//블럭을 생성하는 함수
function drawBricks() {
    for(let c=0; c<bc; c++) {
      for(let r=0; r<br; r++) {
        if(bricks[c][r].status == 1) { //status변수는 0이되면 화면에서 사라지게 하기위해 생성
          let bx = (c*(bw+bp))+bLeft;
          let by = (r*(bh+bp))+bTop;
          bricks[c][r].x = bx;
          bricks[c][r].y = by;
          
          ctx.beginPath();
          ctx.rect(bx, by, bw, bh);
          ctx.fillStyle = "#DF3A01";
          ctx.fill(); //경로의 내부를 채워서 내부가 채워진 도형을 그림
          ctx.closePath();
          }
      }
  }
}

//패달 길이가 짧아지는 함수
function paddleS(){

}


//점수 함수
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
    drawBall2();
    drawPaddle(); //패달 생성
    colCheck();
    drawScore();

    //console.log(life);
    
    if(x + dx > canvas.width-ballSize || x + dx < ballSize) { //오른쪽 벽이나 왼쪽 벽에 부딪치면
        dx = -dx; //방향 전환
        //dx2 = -dx2; 이거 넣으니까 공이 다시 이상한대로 튐
    }
    if(y + dy < ballSize) { //상단벽일 경우 방향을 바꿈
        dy = -dy; //방향 전환
    }

    //------------------두번째 공 함수
    if(x2 + dx2 > canvas.width-ballSize || x2 + dx2 < ballSize) { //오른쪽 벽이나 왼쪽 벽에 부딪치면
        dx2 = -dx2; //방향 전환
    }

    else if(y + dy > canvas.height-ballSize) { //위쪽 벽이나  아래쪽 벽에 부딪치면
        if(x > px && x < px + pWidth) { //패들안에 들어가면 + && x2 > px && x2 < px + pWidth 이걸 추가해서 두번째 공 기능도 넣음
                dy = -dy; //방향전환
        }
        else {
            alert("게임 종료");
            document.location.reload(); //새로고침
            clearInterval(interval); //진행중인 interval을 없애줌
            

        }
    }

    
    
    if(rPressed && px < canvas.width-pWidth) { //(화면 - 패들넓이)/2
        px += 7; //오른쪽으로 7 만큼 이동
    }
    else if(lPressed && px >0) {
        px -= 7; //왼쪽으로 7만큼 이동
    }

    //dx, dy가 2로 설정되어 있기때문에 인터벌인 10밀리세컨드당 대각선으로 움직임
    x += dx; //x좌표 변경
    y += dy; //y좌표 변경

}

let interval = setInterval(update, 10); //10밀리세컨드마다 update 함수를 실행