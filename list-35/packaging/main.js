window.jQuery = function(){}

window.jQuery.ajax = function(options){
  return new Promise((resolve, reject)=>{
    let {url, method, body, headers} = options

    let request = new XMLHttpRequest()
    request.open(method, url)
    for(let key in headers){
      let value = headers[key]
      request.setRequestHeader(key, value)
    }
    request.onreadystatechange = function(){
      if(request.readyState === 4){
        if(request.status >= 200 && request.status < 300){
          // success.call(undefined, request.responseText)
          resolve.call(undefined, request.responseText)
        }else{
          // fail.call(undefined, request.responseText)
          reject.call(undefined, request)
        }
      }    
    }
 
    request.send(body) 
  })
}
button.addEventListener('click', (e) => {
    jQuery.ajax({
      url: './xxx',
      method: 'GET',
      headers:{
        'Content-Type':'text/json;charset:utf-8'
      }
    }).then(
        (text)=>{
            console.log(text)
            return '成功'},
        (request)=>{
            console.log(request)
            return 'error1'}
    ).then(
        (text)=>{console.log(text)},
        (request)=>{console.log(request)}
    )
})
