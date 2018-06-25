## 功能
用代码实现 localhost:8001 和 localhost:8002 之间的 JSONP 请求
## 使用
1. 分别打开两个node服务
    1. `node server.js 8001`或`node server 8001`
    2. `node server.js 8002`或`node server 8002`
2. 在浏览器中访问`localhost:8001`，点击按钮，请求`http://localhost:8002/pay`接口
