var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)
  console.log('路径\n' + path)
  console.log('方法\n' + method.toUpperCase())

  if(path === '/'){
    response.statusCode = 200
    var string = fs.readFileSync('./index.html', 'utf-8')

    // 获取cookies
    let cookies = request.headers.cookie.split('; ')
    let hash = {}
    cookies.forEach((item) => {
      let parts = item.split('=')
      let key = parts[0]
      let value = parts[1]
      hash[key] = decodeURIComponent(value)
    })

    let email = hash.sign_in_email

    // 获取数据库数据
    let users = fs.readFileSync('./db', 'utf-8')
    try{
      users = JSON.parse(users)
    }catch(exception){
      users = []
    }

    let found
    let password
    users.forEach((item, index) => {
      if(item.email === email){
        found = true
        password = item.password
      }
    })

    if(found){
      string = string.replace('__password__', password)
    }else{
      string = string.replace('__password__', '不知道')
    }

    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_up' && method === 'GET'){
    response.statusCode = 200
    let string = fs.readFileSync('./sign_up.html', 'utf-8')
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_up' && method === 'POST'){
    readBody(request).then((body)=>{
      // 解析字符串并转化为hash
      let strings = body.split('&')
      let hash = {}
      strings.forEach((item)=>{
        let parts = item.split('=')
        hash[parts[0]] = decodeURIComponent(parts[1])
      })
      let {email, password, password_verify} = hash

      console.log(hash)

      // 验证用户传值是否符合要求
      if(email.indexOf('@') === -1){
        console.log(1)
        response.statusCode = 401
        response.setHeader('Content-Type','text/json;charset=utf-8')
        response.write(`
          "errors":{
            "email":"invalid"
          }`)
      }else if(password !== password_verify){
        console.log(2)
        response.statusCode = 401
        response.write('password not match')
      }else{
        console.log(3)
        let users = fs.readFileSync('./db', 'utf-8')
        try{
          users = JSON.parse(users)
        }catch(exception){
          users = []
        }

        // 查询当前用户是否存在
        let found
        users.forEach((item, index) => {
          if(item.email === email){
            found = true
          }
        })

        if(found){
          response.statusCode = 401
          response.write('email in use')
        }else{
          users.push({email:email, password:password})
          let userString = JSON.stringify(users)
          fs.writeFileSync('./db', userString)
          response.statusCode = 200
        }
      }
      response.end()
    })
  }else if(path === '/sign_in' && method === 'GET'){
    response.statusCode = 200
    let string = fs.readFileSync('./sign_in.html', 'utf-8')
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_in' && method === 'POST'){
    readBody(request).then((body)=>{
      // 解析字符串并转化为hash
      let strings = body.split('&')
      let hash = {}
      strings.forEach((item)=>{
        let parts = item.split('=')
        hash[parts[0]] = decodeURIComponent(parts[1])
      })
      let {email, password} = hash

      // 验证用户传值是否符合要求
      if(email.indexOf('@') === -1){
        console.log(1)
        response.statusCode = 401
        response.setHeader('Content-Type','text/json;charset=utf-8')
        response.write(`
          "errors":{
            "email":"invalid"
          }`)
      }else{
        console.log(2)
        let users = fs.readFileSync('./db', 'utf-8')
        try{
          users = JSON.parse(users)
        }catch(exception){
          users = []
        }

        // 查询当前用户是否存在
        let found
        users.forEach((item, index) => {
          if(item.email === email && item.password === password){
            found = true
          }
        })

        if(found){
          response.statusCode = 200
          response.setHeader('Set-Cookie', `sign_in_email=${email}`)
        }else{
          response.statusCode = 401
          response.setHeader('Content-Type', 'text/json;charset=urf-8')
          response.write(`
            "errors":{
              "info":"password and email is not equal"
            }`)
        }
      }
      response.end()
    })
  }else if(path === '/main.js'){
    response.statusCode = 200
    var string = fs.readFileSync('./main.js', 'utf-8')
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)
    response.end()
  }else if(path === '/xxx'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')
    response.write(`
     {
      "note":{
        "to": "小谷",
        "from": "方方",
        "heading": "打招呼",
        "content": "hi"
      }
    }   
    `)
    response.end() 
  }else if(path === '/pay'){
    var amount = fs .readFileSync('./db',  'utf-8')
    var newAmount = amount - 1
    fs.writeFileSync('./db', newAmount)
    response.write(`
        ${query.callbackName}.call(undefined, 'success')
        `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})


function readBody(request){
  return new Promise((resolve, reject)=>{
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body)
    })
  })
}

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
