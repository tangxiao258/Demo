button.addEventListener('click', (e) => {
  var request = new XMLHttpRequest()
  request.onreadystatechange = function(){
     console.log(request.readyState)
    if(request.readyState === 4){
      console.log('请求响应都完毕了')
      console.log(request.status)
      if(request.status >= 200 && request.status < 300){
        console.log('说明请求相应成功了')
        console.log(typeof request.responseText)
        console.log(request.responseText)

        let string = request.responseText
        // 把符合JSON语法的字符串
        // 转换成JS对应的值
        let object = window.JSON.parse(string)
        console.log(typeof object)
        console.log(object)

        console.log('object.note')
        console.log(object.note)
      }else{
        console.log('说明请求失败了')
      }
    }    
  }
  request.open('GET', './xxx')
  request.send()
})
