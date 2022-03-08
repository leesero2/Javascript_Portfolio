// 사용변수
const GAME_TIME = 9;
let score = 0;
let time = 0;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
let stageTime = 9;

//var 변수는 요즘 잘 사용안함 (변수 이름을 동일한걸로 적용해도 에러가 안뜸)
//const변수는 상수
//let은 변하는 변수

//계속해서 도큐먼트.쿼리 셀렉트 적기 귀찮으니까 변수로 지정을 함
const wordInput = document.querySelector('.word-input'); 
const wordDisplay = document.querySelector('.word-display'); 
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){ //처음 초기값으로 셋팅할 함수들
    getWords()
    wordInput.addEventListener('input',checkMatch)
}

//게임 실행 함수
function run(){
    if(isPlaying){
        return;
        //리턴값을 줘야 게임중 다시 버튼을 눌러도 초기화가 안됨
    }
    isPlaying = true; //현재 플레잉중
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000); //시간을 시작
    checkInterval = setInterval(checkStatus,50);
    buttonChange('게임중')
    stageup()
    
}

//단계 함수
function stageup(){
    if(score == 5){
        stageTime--;
        alert("시간을 단축합니다!.")
    }else if(score == 2){
        stageTime--;
        alert("시간을 단축합니다!.")
    }else if(score == 4){
        stageTime--;
        alert("시간을 단축합니다!.")
    }else if(score == 7){
        stageTime--;
        alert("시간을 단축합니다!.")
    }else if(score == 10){
        GameWin()
    }
}

//단어 불러오기 함수
function getWords(){ 
    words = ["the","of","and","to","in","you","for","or","it","as","be","on","with","can","have","this","by","not","but","at","from","they","more"
    ,"will","if","some","there","what","about","which","when","one","all","also",
    "him","her","hello","java","script","project","juice","math","tree","cloth","key","board","mouse","paper","bot","dry",
    "book","mac","com","naver","cup","top","good","excel","nice","gang","bro","sis","bag","pad","arm","nose","hair","head","leg",
    "sharp","pen","hold","hole","open","close","pin","ear","eye","mouth","clock","peak","tear","drop","rain","bow","pair","team",
    "candy","rice","food","meat","pork","fruit","gum","meal","fast","go","zig","zag","super","dad","mom","uncle","grand"];

    buttonChange('게임시작') //버튼이 바뀜
}

//체크 상태 함수
function checkStatus(){
    if(!isPlaying && time === 0){
        // === 등호가 3개이면 비교하는 타입까지 비교를 함 (정수형 문자형 타입말하는거임)
        buttonChange("게임시작") //시간이 0이되면 버튼의 내용이 바뀜
        clearInterval(checkInterval)
    }
}

//단어 일치 체크 함수
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = ""; //타자가 맞다면 초기화
        if(!isPlaying){
            return;
        }
        score++; //스코어증가
        scoreDisplay.innerText = score; //스코어를 증가를 나타냄
        //time = GAME_TIME; //시간 초기화
        time = stageTime; //줄어든 시간으로 초기화
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
        stageup()
        
    //console.log(wordInput.value.toLowerCase() === wordDisplay.innerText/toLowerCase())//저음 뜬 단어와 입력단어를 비교 innterText는 공백을 다 줄여주기때문에 사용
    //toLowerCase()는 소문자로 반환을 해줌
    }
    
}

function GameWin(){
    alert("클리어!")
    wordDisplay.innerText = "클리어를 축하드립니다!"
    clearInterval(timeInterval) //클리어 인터벌을 통해 중단 
}

//setInterval(countDown,1000); //바로 실행되는 함수임, 1초마다 시간을 줄어드는것
buttonChange('게임시작')


//카운트 다운 함수
function countDown(){
    //삼항 연산자를 사용 (조건) ? 참일경우 : 거짓일 경우
    time > 0 ? time -- : isPlaying = false;
    //time이 0보다 크게 될경우 시간을 --을 통해 감소시킴
    if(!isPlaying){ //게임을 플레이중이 아니라면
        clearInterval(timeInterval) //클리어 인터벌을 통해 중단 
        alert("게임오버")
    }
    timeDisplay.innerText = time;

}

//버튼 체인지 함수
function buttonChange(text){
    button.innerHTML = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}

