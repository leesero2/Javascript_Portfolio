const playground = document.querySelector(".playground > ul");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//변수
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = { // ㅗ 모양
    tree: [
        [[2,1],[0,1],[1,0],[1,1]], //초기모양
        [], //오른쪽으로 한번 돌린모양
        [], //오른쪽으로 두번 돌린모양
        [], //오른쪽으로 세번 돌린모양
    ]
}

const movingItem = { 
    type: "tree",
    direction: 0,
    top: 0,
    left: 3,
};

//functions 스크립트가 호출이될때 시작이 되는 함수
init()

function init() {
    tempMovingItem = { ...movingItem }; // {... } : 스프레드 오퍼레이터 -  이걸 하면 movingItem안의 값만 대입을 시킴
    for(let i = 0; i < GAME_ROWS; i++){
        prependNewLine()
    }
    renderBlocks() //블럭을 랜더
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
function renderBlocks(){
    const {type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving =>{
        moving.classList.remove(type,"moving");
    })
    BLOCKS[type][direction].forEach(block => {
        const x = block[0] + left; //x좌표를 left에 더해서 값이 대입됨
        const y = block[1] + top; //y좌표를 top에 더해서 값이 대입됨
        //삼항연산자 - 조건 ? 참일경우 : 거짓일경우
        const target = playground.childNodes[y] ? playground.childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if(isAvailable){ 
        target.classList.add(type, "moving")
        }else{
            tempMovingItem = {...movingItem }
            // setTimeout(() =>{
            //     renderBlocks();
            // },0)
            //renderBlocks();
        }
    });
}

function checkEmpty(target){
    if(!target){
        return false;
    }
    return true;
}


function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount;
    renderBlocks()
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
        default:
            break;

    }
    console.log(e)
})


