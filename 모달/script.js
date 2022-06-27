;(function () {
  'use strict'
  const get = (target) => {
    return document.querySelector(target)
  }
  const $button = get('.modal_open_button')
  const $modal = get('.modal')
  const $body = get('body')
  const $modalConfirm = get('.modal_button.confirm')
  // get 함수로 잡아오기!

  const toggleTest = () =>{
    $modal.classList.toggle('show') // 토글버툰 활용
    $body.classList.toggle('screenLock') // 없을경우 생성 있을경우 제거! 토글버툰 활용
  }
  $button.addEventListener('click',()=>{toggleTest()})
 
   $modalConfirm.addEventListener('click',()=>{
    toggleTest()
  })


})()

// classList.toggle
// add remover