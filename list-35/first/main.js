
window.jQuery = function(){}

window.jQuery.ajax = function(url, method, body, success, fail){
  var request = new XMLHttpRequest()
  request.onreadystatechange = function(){
    if(request.readyState === 4){
      if(request.status >= 200 && request.status < 300){
          success.call(undefined, request.responseText)
      }else{
          fail.call(undefined, request.responseText)
      }
    }    
  }
  request.open(method, url)
  request.send(body)
 
}
button.addEventListener('click', (e) => {
    jQuery.ajax('/xxx', 'GET', '', (x)=>{console.log(1)}, (x)=>{console.log(2)})
})
