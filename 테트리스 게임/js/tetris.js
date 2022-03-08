import BLOCKS from "./block.js"


const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//변수
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;



const movingItem = { 
    type: "tree",
    direction: 3,
    top: 0,
    left: 0,
};

//functions 스크립트가 호출이될때 시작이 되는 함수
init()

function init() {
    tempMovingItem = { ...movingItem }; // {... } : 스프레드 오퍼레이터 -  이걸 하면 movingItem안의 값만 대입을 시킴
    for(let i = 0; i < GAME_ROWS; i++){
        prependNewLine()
    }
    generateNewBlock() //블럭을 랜더
}

//functions
function prependNewLine(){
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j = 0; j < 10; j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul)
    playground.prepend(li)
}

//블럭을 렌더링 하는 함수
function renderBlocks(moveType = ""){
    const {type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving =>{
        moving.classList.remove(type,"moving");
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left; //x좌표를 left에 더해서 값이 대입됨
        const y = block[1] + top; //y좌표를 top에 더해서 값이 대입됨
        //삼항연산자 - 조건 ? 참일경우 : 거짓일경우
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if(isAvailable){ 
            target.classList.add(type, "moving")
        }else{
            tempMovingItem = {...movingItem }
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
            scoreDisplay.innerHTML = score;
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
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}

function changeDirection(){ //도형 회전 함수
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction +=1;
    renderBlocks()
}


function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
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
