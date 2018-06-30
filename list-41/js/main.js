let css1 = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
    transition: all 1s;
}
html{
    background:#eee;
}
#code{
    border:1px solid #aaa;
    padding:16px;
}


/*我需要一点代码高亮*/

.token.selector{
    color:#690;
}
.token.property{
    color:#905;
}

/* 加一个呼吸效果 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`

let css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */

`

let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`


function writeCss(prefix, code, fn){
    let domCode = document.querySelector('#code')
    let domStyle = document.querySelector('#styleTag')
    let n = 0

    let timeId = setInterval(()=>{
        if(n > code.length){
            window.clearInterval(timeId)
            fn && fn.call()
        }
        domCode.innerHTML = Prism.highlight(prefix + code.substr(0, n), Prism.languages.css)
        domStyle.innerHTML = prefix + code.substr(0, n)
        domCode.scrollTop = domCode.scrollHeight
        n += 1
    },20)
}

writeCss('', css1, ()=>{
    createPaper(()=>{
        writeMarkdown(md, ()=>{
            writeCss(css1, css2, ()=>{
                covertMarkdownToHtml(()=>{
                    writeCss(css1+css2, css3, ()=>{
                        console.log('结束啦')
                    })
                })
            })
        })
    })
})

function writeMarkdown(markdown, fn){
    let domMarkdown = document.querySelector('#paper>.content')
    let n = 0

    let timeId = setInterval(()=>{
        if(n > markdown.length){
            window.clearInterval(timeId)
            fn && fn.call()
        }
        domMarkdown.innerHTML = markdown.substr(0, n)
        n += 1
    },20)
}

function createPaper(fn){
    let paper = document.createElement('div')
    paper.id = 'paper'
    let content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)

    document.body.appendChild(paper)

    fn && fn.call()
}

function covertMarkdownToHtml(){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}

var md = `
# 自我介绍
我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`