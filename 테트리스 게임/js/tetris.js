const playground = document.querySelector(".playground > ul");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//functions 스크립트가 호출이될때 시작이 되는 함수
init()

function init(){
    tempMovingItem = { ...movingItem }; // {... } : 스프레드 오퍼레이터 -  이걸 하면 movingItem안의 값만 대입을 시킴
    for(let i = 0; i < GAME_ROWS; i++){
        prependNewLine()
    }
    renderBlocks()
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
    
    BLOCKS[type][direction].forEach(block => {
        const x = block[0];
        const y = block[1];
        const target = playground.childNodes[y].childNodes[0].childNodes[x];
        target.classList.add(type)
        
    });
}



//variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;


const BLOCKS = {
    tree: [
        [[0,0]],[[0,1]],[[1,0]],[[1,1]],
        [],
        [],
        [],
    ]
}

const movingItem = {
    type: "tree",
    direction: 0,
    top: 0,
    left: 3,
};
