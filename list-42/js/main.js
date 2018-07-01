!function(){
  let duration = 50
  $('.operator-wrapper > .button').on('click', (e)=>{
    let $button = $(e.currentTarget)
    console.log($button)
    $button.addClass('active')
    .siblings('.active').removeClass('active')
    let size = $button.attr('data-size')
    switch(size){
      case 'small':
        duration = 100
        break;
      case 'normal':
        duration = 50
        break;
      case 'fast':
        duration = 20
        break;
      default:
        break;
    }
  })

  function writeCode(prefix, code, fn){
    let domCode = document.querySelector('#code')
    let styleTag = document.querySelector('#styleTag')
    let n = 0
    timeId = setTimeout(function f1(){
      n = n + 1
      domCode.innerHTML = prefix + code.substr(0, n)
      styleTag.innerHTML = prefix + code.substr(0, n)
      domCode.scrollTop = domCode.scrollHeight
      if(n < code.length){
        timeId = setTimeout(f1, duration)
      }else{
        window.clearTimeout(timeId)
        fn && fn.call()
      }
    }, duration)
  }

  let code = `
    .content-wrapper{
      height:100%;
      background-color: #fee613;
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .preview{
      width:100%;
      height:200px;
      position:relative;
    }
    .nose{
      position:absolute;
      top:30px;
      left:50%;
      margin-left:-8px;
      border:8px solid;
      border-color:#000 transparent transparent transparent;
      border-radius:50%;
    }
    .eye{
      width:56px;
      height:56px;
      border-radius:50%;
      background-color: #2f2f2f;
      border:2px solid #000;
      position:absolute;
      left:50%;
    }
    .eye:before{
      position:absolute;
      content:'';
      top:2px;
      left:7px;
      width:25px;
      height:25px;
      background-color: #fff;
      border-radius:50%;
      border:2px solid #000
    }
    .eye.left{
      margin-left:-140px;
    }
    .eye.right{
      margin-left:98px;
    }
    .face{
      width:70px;
      height:70px;
      border-radius:50%;
      background-color: #ff0000;
      border:2px solid #000;
      position:absolute;
      left:50%;
      top:100px;
    }
    .face.left{
      margin-left:-186px;
    }
    .face.right{
      margin-left:116px;
    }
    .lipUpper{
      width:80px;
      height:25px;
      border:2px solid #000;
      position:absolute;
      top:60px;
      left:50%;
      background-color: #fee613;;
    }
    .lipUpper.left{
      border-top:none;
      border-right:none;
      border-bottom-left-radius:40px 25px;
      margin-left:-80px;
      transform:rotate(-30deg);
    }
    .lipUpper.right{
      border-top:none;
      border-left:none;
      border-bottom-right-radius:40px 25px;
      margin-left:0;
      transform:rotate(30deg);
    }
    .lipLow-wrapper{
      position:absolute;
      left:50%;
      margin-left:-70px;
      bottom:0;
      width:140px;
      height:138px;
      border-top-left-radius:100px 120px;
      border-top-right-radius:100px 120px;
      overflow:hidden;
    }
    .lipLow{
      width:140px;
      height:800px;
      border-radius:140px/800px;
      border:2px solid #000;
      background-color:#af0900;
      position:absolute;
      bottom:0;
      overflow:hidden;
    }
    .lipLow:after{
      position:absolute;
      content:'';
      left:50%;
      margin-left:-50px;
      bottom:0;
      width:100px;
      height:100px;
      background-color: #ff324b;
      border-radius:50%;
    }`

    writeCode('', code)
}.call()