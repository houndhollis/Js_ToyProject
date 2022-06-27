(()=>{
    const get = (target) => document.querySelector(target); 
    const init = () =>{
        get('form').addEventListener('submit',(e)=>{
           playGame(e)
        })
        setPassword()
    }
    

    const baseball = {
        limit: 10,
        digit: 4,
        trial: 0,
        end:false,
        $question: get('.ball_question'),
        $answer:get('.ball_answer'),
        $input:get('.ball_input')
    }
    
    const {limit,digit,$question,$answer,$input} = baseball
    let {trial,end} = baseball // 중간에 바뀌는값

    const setPassword = () =>{
        // 패스워드를 지정해주기!
        const gameLimit = Array(limit).fill(false)
        let password = ''
        while(password.length<digit){
            const random = parseInt(Math.random()*10,10)

            if(gameLimit[random]){
                continue
            }
            password += random
            gameLimit[random] = true
        } 
        baseball.password = password
    }
    
    
    const onPlayed = (number,hint) =>{
        //시도를 했을 때 내가 입력한값 넘버, 실행 결과 힌트
      return `<em>${trial}차 시도</em>: ${number},${hint}<br/>`
    }
    
    const isCorrect = (number,answer) => {
        return number === answer
    }
    
    const isDuplicate = (number) =>{
        //중복 번호가 있는가?
        return [...new Set(number.split(''))].length !== digit
    }
    
    const getStrikes = (number,answer) =>{
        //스트라이크 카운터는 몇개?
        let strike = 0
        const nums = number.split('')
        nums.map((digit, index) => {
          if (digit === answer[index]) {
            strike++
          }
        })
    
        return strike
    }

    const getBalls =(number,answer)=>{
        // 볼 카운트는 몇개?
        let ball = 0
        const nums = number.split('')
        const gameLimit = Array(limit).fill(false)
    
        answer.split('').map((num) => {
          gameLimit[num] = true
        })
    
        nums.map((num, index) => {
          if (answer[index] !== num && !!gameLimit[num]) {
            ball++
          }
        })
    
        return ball
      }
    const getResult = (number,answer) =>{
        //시도에 따른 결과는?
        if(isCorrect(number,answer)){
            end = true
            $answer.innerHTML = baseball.password
            return '홈런!'
        }
        const strike = getStrikes(number,answer)
        const balls = getBalls(number,answer)

        return 'STRIKE: ' + strike + 'BALL: ' + balls
    
    }

    const playGame =(e)=>{
        //게임 플레이
        e.preventDefault()
        if(!!end){
            return
        }
        const inputNuber = $input.value
        const {password} = baseball

        if(inputNuber.length !== digit){
            alert(`${digit}자리 숫자를 입력해 주세요`)
        } else if(isDuplicate(inputNuber)){
            alert('중복 숫자가 있습니다.')
        }else{
            trial ++
            const result = onPlayed(inputNuber,getResult(inputNuber,password))
            $question.innerHTML += `<span>${result}</span>`
        }
        if(limit <= trial && !isCorrect(inputNuber,password)){
            alert('쓰리아웃입니다!')
            end = true
            $answer.innerHTML = password;
        }
    } 
    $input.value = ""
    $input.focus()

    init()
})()
