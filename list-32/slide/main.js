let $slide = $('.slide')
let n = 0

init()

$('.menu>li').on('click', function(e){
  n = $(e.currentTarget).attr('index')
  $(e.currentTarget).addClass('active')
	.siblings().removeClass('active')
  $slide.css({
    transform: `translateX(-${n*920}px)`
  })
})

function init(){
  $('.menu>li').eq(0).addClass('active')
  $slide.css({
    transform:'translateX(0px)'
  })
}
