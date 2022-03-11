import BLOCKS from "./block.js" //block.js 부분을 import 소스


const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");
const stageLV = document.querySelector(".stage");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//변수
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
let stage = 1;

const movingItem = { 
    type: "tree",
    direction: 3, //방향키를 눌렀을때 좌우로 돌리는 역할을 하는 변수
    top: 0, //좌표기준으로 어디까지 내려가야하는지 나타내줄 변수
    left: 0, //좌표 기준으로 좌우 기준을 나타내줄 변수
};

//functions 스크립트가 호출이될때 시작이 되는 함수
init()

function init() {
    tempMovingItem = { ...movingItem }; // {... } : 스프레드 오퍼레이터 -  이걸 하면 movingItem안의 값만 대입을 시킴 (값을 복사한다 라고 생각하면 됨)
    for(let i = 0; i < GAME_ROWS; i++){ //세로부분 크기를 결정 
        prependNewLine()
    }
    generateNewBlock() //블럭을 랜더
}

//테트리스 칸을 만드는 함수
function prependNewLine(){
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j = 0; j < 10; j++){ //가로 크기를 결정
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul)
    playground.prepend(li)
}

//단계 증가 함수
function stageUP(){
    stage++;
    alert(stage+"단계 시작")
    stageLV.innerHTML = stage + "단계"
}


//블럭을 렌더링 하는 함수
function renderBlocks(moveType = ""){
    const {type, direction, top, left} = tempMovingItem; //이렇게 { } 로 묶는게 편함
    const movingBlocks = document.querySelectorAll(".moving"); //도형을 움직일때 그전위 위치를 지우기위한 소스 / 무빙 클래스를 가진 모든 요소들을 불러옴
    movingBlocks.forEach(moving =>{ 
        moving.classList.remove(type,"moving"); //움직일때 type 과 무빙 클래스를 지움 (이전의 위치를 지움)
    })
    BLOCKS[type][direction].some(block => { //type은 블록모양, direction은 좌표값 (모양) 을 접근함
        const x = block[0] + left; //x좌표를 left에 더해서 값이 대입됨 (좌우로 움직이게함)
        const y = block[1] + top; //y좌표를 top에 더해서 값이 대입됨 (아래로 떨어지게함)
        //삼항연산자 - 조건 ? 참일경우 : 거짓일경우
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null; 
        //playground.childNodes[y] 가 있으면 playground.childNodes[y].childNodes[0].childNodes[x] 이값을 target에 저장하고
        //없으면 null값을 저장
        const isAvailable = checkEmpty(target);//checkEmpty는 값의 유무를 확인하는 함수
        if(isAvailable){ //사용가능한 상황이라면
            target.classList.add(type, "moving") 
        }else{
            tempMovingItem = {...movingItem } //tempMovingItemr값을 원상복귀(초기화)
            if(moveType === 'retry'){
                clearInterval(downInterval)
                ShowGameOver()
            }
            setTimeout(() =>{ 
                renderBlocks('retry')
                if(moveType === "top"){
                    seizeBlock();
                }
                renderBlocks();
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
        moving.classList.remove("moving");
        moving.classList.add("seized");
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
        moveBlock('top',1)
    },duration)
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length)
    
    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 3;
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
document.addEventListener("keydown", e=>{
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
        default:
            break;
        case 38:
            changeDirection();
            break;
        case 32:
            dropBlock();
            break;
    }
    console.log(e)
})

//다시시작 버튼 이벤트 클리너
restartButton.addEventListener("click",()=>{
    gameText.style.display = "none";
    playground.innerHTML = "";
    init()
})
