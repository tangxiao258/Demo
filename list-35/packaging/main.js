window.jQuery = function(){}

window.jQuery.ajax = function(options){
  let {url, method, body, headers, success, fail} = options

  let request = new XMLHttpRequest()
  request.open(method, url)
  for(let key in headers){
    let value = headers[key]
    request.setRequestHeader(key, value)
  }
  request.onreadystatechange = function(){
    if(request.readyState === 4){
      if(request.status >= 200 && request.status < 300){
          success.call(undefined, request.responseText)
      }else{
          fail.call(undefined, request.responseText)
      }
    }    
  }
 
  request.send(body)
 
}
button.addEventListener('click', (e) => {
    jQuery.ajax({
      url: './xxx',
      method: 'GET',
      headers:{
        'Content-Type':'text/json;charset:utf-8'
      },
      success: (text)=>{
          console.log(text)
      },
      fail: (request)=>{
          console.log(request)
      }
    })
})
