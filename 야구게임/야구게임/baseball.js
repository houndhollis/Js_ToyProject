const getDom = (target) => document.querySelector(target);
const $input = getDom('.input');
const $button = getDom('.form_button');
const $logs = getDom('.logs');

const number = [] // [1,2,3,4,5,6,7,8,9]
for(let i = 1; i<10; i++){
    number.push(i)
} 
// 여기서 세자리 뽑기! 랜덤으로 3자리가 담긴다.
const answer = [] 
for(let j = 0; j<3;j++){ 
    const index = Math.floor(Math.random()*(number.length-j))
    answer.push(number[index]) // index 로 넘버에서 3자리 뽑아오기
    number.splice(index,1)
}
console.log(`정답은 ${answer} 입니다`)

const playResult = () =>{
   const endGame = prompt(`3개의 숫자를 모두 맞히셨습니다! 게임 종료 게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.`)
   if(Number(endGame)===1){
    location.reload()
   }
   if(Number(endGame)===2){
    window.close() // 디폴트 브라우져로 켰을경우 작동하고 
                   // 라이브 서버로 열었을시 작동이 되지않는다.
   }
}
// 
const playStrike = (value) => {
   let strike = 0;
   let ball = 0;
   for(let i = 0; i < answer.length; i++){
     const idx = value.indexOf(answer[i])
     if(idx !== -1){
       if(idx === i){
           strike ++
       }else{
           ball ++
       }
    }
}
$logs.textContent = `${$logs.textContent} ${strike}스트라이크 ${ball}볼`

   if(answer.join('')===value){
    $logs.textContent = `3개의 숫자를 모두 맞히셨습니다! 게임 종료 게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.`
    setTimeout(()=>{
        playResult()
    },1000)  
   }
}

const playCheck = (value) =>{
    if(value.length < 3){
        alert('숫자는 3자리수 입니다.')
        return;
    }
    if(new Set(value).size !== 3){
        alert('숫자는 중복되면 안됩니다.')
        return;
    }
    playStrike(value)
}

const playGame = () =>{
   const value = $input.value
   $input.value = ""
   playCheck(value)
}

$button.addEventListener('click', (e)=>{
     e.preventDefault()
     playGame()
})
