const getDom = (target) => document.querySelector(target); // 뒷쪽부분 반복적인 부분 정리
const $input = getDom('.input');
const $button = getDom('.form_button');
const $logs = getDom('.logs');
let isPlaying = true;

 
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
// -----------------------여기까지가 내가 맞춰야할 중복되지 않는 정수 3개 뽑는법 ---------------------

// const playResult = () =>{
//    const endGame = prompt(`3개의 숫자를 모두 맞히셨습니다! 게임 종료 게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.`)
//    if(Number(endGame)===1){
//     location.reload()
//    }
//    if(Number(endGame)===2){
//     window.close() // 디폴트 브라우져로 켰을경우 작동하고 
//                    // 라이브 서버로 열었을시 작동이 되지않는다.
//    }
// }
//  윗쪽이 초기의 내가 생각했던 방식이다 prompt 를 줘서 할까 생각을 했지만 조금 더 공부하고 알아본봐
// isPlaying 이라는 변수를 진행중일때는 true 로 주고 게임이 끝나면 fasle로 줘서 맨밑쪽 addEventListen 조작. 
// *추가* 실제로 아랫라인 if 문으로 isPlaying 을 조작하여 프롬트 없이 새롭게 구현 


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
$logs.innerHTML = ` ${$logs.innerHTML} 입력값은:${value}, ${strike}스트라이크 ${ball}볼 <br> `

   if(answer.join('')===value){
    isPlaying = false;
    $logs.textContent = `3개의 숫자를 모두 맞히셨습니다! 게임 종료 게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.`
    // setTimeout(()=>{
    //     playResult()
    // },1000)   
    // 프롬트를 사용 했을 경우 사용했던 방식, 프롬트가 바로 실행되어서 셋타임 아웃을 줘서 
    // 텍스트 컨텐트가 실행할 시간을 주었다..?
  }
}

const playCheck = (value) =>{
    //  playCheck 같은 경우는 유효성 검사이다.
    if(isNaN(Number(value))){
        alert('숫자만 넣어주세요!')
        return;
    }
    if(value.indexOf('0')!== -1){
        alert('1~9까지의 숫자를 넣어주세요!')
        return;
    }
    if(value.length !== 3){
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
    if(isPlaying){
     e.preventDefault()
     playGame()
    }else{
     e.preventDefault()
     if($input.value === '1'){
        location.reload()
     }
     if($input.value === '2'){
        window.close()
     }
   }
})
