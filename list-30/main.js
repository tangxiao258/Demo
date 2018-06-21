let n = 1

init()  // 初始化

setInterval(function(){
	makeLeave($(`.images > img:nth-child(${x(n)}`)).one('transitionend',(e) => {
	    makeEnter($(e.currentTarget))
	})
	makeCurrent($(`.images > img:nth-child(${x(n + 1)})`))
	n = n + 1
},3000)


function x(n){
  if(n>3){
    n = n%3
    if (n===0){
      n =3
    }
  } // n = 1 2 3
  return n
}

function init(){
    $('.images > img:nth-child(1)').addClass('current')
    .siblings().addClass('enter')
}


function makeLeave($node){
    $node.removeClass('current').addClass('leave')
    return $node
}

function makeCurrent($node){
    $node.removeClass('enter').addClass('current')
}

function makeEnter($node){
    $node.removeClass('leave').addClass('enter')
}

