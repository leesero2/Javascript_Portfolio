import BLOCKS from "./block.js" //block.js 부분을 import 소스

const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");
const stageLV = document.querySelector(".stage");

//Setting
const GAME_ROWS = 20; //세로
const GAME_COLS = 10; //가로

//변수
let score = 0;
let duration = 500; //속도 변수
let downInterval;
let tempMovingItem; //movingItem 을 실행하기전 잠깐 담아둘 변수
let stage = 1;

const movingItem = { //실질적으로 블럭의 타입, 좌표등의 정보를 담을 변수
    type: "tree", 
    direction: 3, //방향키를 눌렀을때 좌우로 돌리는 역할을 하는 변수
    top: 0, //좌표기준으로 어디까지 내려가야하는지 나타내줄 변수
    left: 0, //좌표 기준으로 좌우 기준을 나타내줄 변수
};

//functions 스크립트가 호출이될때 시작이 되는 함수
init()

function init() {
    // duration = 500; //속도 초기화
    // stage = 1; //단계 초기화
    // score = 0;
    tempMovingItem = { ...movingItem }; // {... } : 스프레드 오퍼레이터 -  이걸 하면 movingItem안의 값만 대입을 시킴 (값을 복사한다 라고 생각하면 됨)
    for(let i = 0; i < GAME_ROWS; i++){ //세로부분 크기를 결정 
        prependNewLine() //prependNewLine()함수를 20번 반복
    }
    generateNewBlock() //블럭을 랜더
}

//테트리스 칸을 만드는 함수
function prependNewLine(){
    const li = document.createElement("li"); //li 속성 지정
    const ul = document.createElement("ul"); //ul 속성 지정
    for(let j = 0; j < GAME_COLS; j++){ //가로 크기를 결정
        const matrix = document.createElement("li"); //하나의 사각형칸을 matrix라고 변수 지정, 속성은 li로 지정
        ul.prepend(matrix); //위에 ul 속성을 지정한 ul 상수에 prepend 메서드를통해 matrix 변수에 붙임 (이걸 총 10번 반복)
    }
    li.prepend(ul) //li에 담음
    playground.prepend(li) //li를 playground에 prepend 시켜주면 됨
}

//단계 증가 함수
function stageUP(){
    stage++;
    alert(stage+"단계 시작")
    stageLV.innerHTML = stage + "단계";
    duration -= 100; //속도를 증가
    console.log(duration);
    
}


//블럭을 렌더링 하는 함수
function renderBlocks(moveType = ""){
    const {type, direction, top, left} = tempMovingItem; //tempMovingItem에 있는 각각의 프로퍼티들을 변수로 사용

    const movingBlocks = document.querySelectorAll(".moving"); //도형을 움직일때 그전위 위치를 지우기위한 소스 / 무빙 클래스를 가진 모든 요소들을 불러옴
    movingBlocks.forEach(moving =>{ 
        moving.classList.remove(type,"moving"); //움직일때 type 과 무빙 클래스를 지움 (이전의 위치를 지움)
    })

    BLOCKS[type][direction].some(block => { //type은 블록모양, direction은 좌표값 (모양) 을 접근함
        //direction 배열 위치가 0번이면 가장 기본적인 모양, 1번이면 한번 회전한 모양 이렇게 지정이됨
        //2차원 배열이라 []첫번재는 도형의 모양을 뜻함
        const x = block[0] + left; //x좌표를 left에 더해서 값이 대입됨 (좌우로 움직이게함) 
        const y = block[1] + top;  //y좌표를 top에 더해서 값이 대입됨 (아래로 떨어지게함)
        //여기서 x의 값은 0번 type에 [0,0]중 첫번째 값을 의미하기에 [0]임, 두번째 자리 값은 y값을 의미하기에 [1]을 지정
        //삼항연산자 - 조건 ? 참일경우 : 거짓일경우
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        //childNodes[y]는 높이를 의미함 그래서 0:li 라고 뜨기에 0번을 택함, y안에 들어있는 childNodes의 0번이 ul이 됨, 그 ul안에 또 childNodes가 있는데 그게 x값임 (이해가 안되면 23분부터)
        //playground.childNodes[y] 가 있으면 playground.childNodes[y].childNodes[0].childNodes[x] 이값을 target에 저장하고
        //없으면 null값을 저장

        //console.log(target); some 반복문으로 돌렸기 때문에 type이 tree인 도형의 모양 좌표가 console로 출력됨

        const isAvailable = checkEmpty(target);//checkEmpty는 값의 유무를 확인하는 함수, target을 인자로 넘김
        if(isAvailable){ //사용가능한 상황이라면
            target.classList.add(type, "moving") //classList에 type을 추가
        }else{
            tempMovingItem = {...movingItem } //tempMovingItemr값을 원상복귀(초기화)
            if(moveType === 'retry'){
                clearInterval(downInterval)
                ShowGameOver()
            }
            setTimeout(() =>{  //게임 외 범위를 벗어나는것을 방지하기위해
                renderBlocks('retry')
                if(moveType === "top"){ //움직이는게 밑으로 떨어지는거라면
                    seizeBlock(); //블럭을 고정시키는 함수 실행
                }
                renderBlocks(); //랜더
            },0)
            //renderBlocks();
            return true;
        }
    })
    //movingItem 위치를 수정 (위의 조건을 다 만족하고 이제 위치를 잡아줌) 
    movingItem.left = left; 
    movingItem.top = top;
    movingItem.direction = direction;
}

function seizeBlock(){ //고정시키는 함수
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving =>{
        moving.classList.remove("moving"); //움직임을 지우고
        moving.classList.add("seized"); //고정을 추가
    })
    checkMatch()
    //generateNewBlock()
}

function ShowGameOver(){
    gameText.style.display = "flex"
}

function checkMatch(){ //같은줄을 지우는 함수
    const childNodes = playground.childNodes;
    childNodes.forEach(child=>{
        let matched = true;
        child.children[0].childNodes.forEach(li=>{
            if(!li.classList.contains("seized")){
                matched = false;
            }
        })
        if(matched){
            child.remove();
            prependNewLine()
            score++;
            scoreDisplay.innerHTML = "점수 : "+ score ;
            if(score % 10 == 0){ //10점마다 단계를 상승
                stageUP()
            }
            // switch(score){
            //     case 3:
            //         stageUP();
            //         break;
            //     case 5:
            //         stageUP();
            //         break;
            //     case 10:
            //         stageUP();
            //         break;
            // }
        }
    })
    generateNewBlock()
}

function generateNewBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock('top',1) //top으로 1씩 블럭을 움직임
    },duration)
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length)
    
    movingItem.type = blockArray[randomIndex][0] //생성될 블럭을 랜덤으로 출력
    movingItem.top = 0; //0번에서 나옴 (3으로 하면 3칸 아래서 생성됨)
    movingItem.left = 3; //새로 생성된 블록이 left에서 3칸 이동된 좌표로 나옴
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks()
}

function checkEmpty(target){
    if(!target || target.classList.contains("seized")){ //target이 없거나 클래스 요소에 seized가 포함되어있지 않다면
        return false; //false 값을 리턴
    }
    return true; //조건을 만족하지 않으면 true값 리턴
}

function changeDirection(){ //도형 회전 함수
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction +=1;
    renderBlocks()
}

//블럭이 움직이는 함수
function moveBlock(moveType, amount){ //movetype : left인지 top인지 
    tempMovingItem[moveType] += amount; //렌더링을 tempMovingItem으로 값을 갖고오기 때문에 얘 값만 변경
    renderBlocks(moveType) //다시한번더 렌더블럭
}

function dropBlock(){ //스페이스바 함수
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock('top',1)
    },10)
}

//이벤트 핸들링 
document.addEventListener("keydown", e=>{ //keydown 이벤트가 벌어질때, 이벤트 객체를 인자로 넘겨받음
    switch(e.keyCode){
        case 39:
            moveBlock("left",1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            changeDirection();
            break;
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
    //console.log(e)
})

//다시시작 버튼 이벤트 클리너
restartButton.addEventListener("click",()=>{
    gameText.style.display = "none";
    playground.innerHTML = "";
    init()
})

//멀티플레이 및 아래 굳는거 표현하기