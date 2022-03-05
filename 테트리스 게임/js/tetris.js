const playground = document.querySelector(".playground > ul");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//functions 스크립트가 호출이될때 시작이 되는 함수
init()

function init(){
    

    for(let i = 0; i < GAME_ROWS; i++){
        prependNewLine()
    }
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

function renderBlocks(){

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
    left: 0,

}
