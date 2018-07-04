## 手机专用的自适应方案
#### 1. 什么是REM
#### 2. REM和EM的区别是什么

单位 | 解释 | 全等
--- | --- | ---
px | 像素 | 1px === 1个物理像素
em  | 一个M的宽度/一个汉字的宽度 |  1em === font-size
rem | root em/根元素的font-size | 1rem === html font-size
vh | viewport height 视口高度  | 100vh === 视口高度
vw | viewport width 视口宽度 | 100vw === 适口宽度

#### 3. 浏览器显示网页的特点
- 网页的默认`font-size`是16px
- 浏览器（只有Chrome）默认最小字体大小是12px，如果你不改，你设置6px它显示的也是12px

#### 4. 日常使用百分比做自适应的问题
- 百分比布局最大的问题是宽度无法确定，导致高度无法跟宽度做任何的配合
- rem最主要的思想就是缩放，同时解决了高度和宽度没有关联的问题

#### 5. 手机端方案的特点
- 所有手机显示的界面都是一样的，只是大小不同
- 所以，一切单位以宽度为基准，就能保证完美还原设计稿
- `vw`最好，但是兼容性太差
- `px`和页面宽度无关系，只和物理像素有关
- `em`和`font-size`有关系，但是和页面宽度也无关系
- `rem`和`html`的`font-size`有关系，和页面宽度也无关系

#### 6. 淘宝UED的如何解决
- 因此淘宝的前端就日思夜想，想到可以通过`js`让`rem`和页面宽度建立起关系
- 就是通过js写html的font-size=window.innerWidth
```
var pageWidth = window.innerWidth
document.write(`<style>
html{
    font-size:${pageWidth}px
}
</style>`)

1rem === pageWidth
```
- 使得1rem = html font-size = viewport width

#### 7. REM可以与其他单位同时存在
- 当元素特别小的时候，就不要用rem了，可以和px混着用
```
font-size:16px;
border:1px solid red;
width:0.5rem;
```

#### 8. 在SCSS里使用PX2REM
- 每次我们都要把设计稿的px转化成REM
- 十分的麻烦
- 使用SCSS自定义函数作为转换

**使用SCSS让代码变得不在那么麻烦**
- npm config set registry https://registry.npm.taobao.org/
- touch ~/.bashrc
- echo 'export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass"' >> ~/.bashrc
- source ~/.bashrc
- npm i -g node-sass
- mkdir ~/Desktop/scss-demo
- cd ~/Desktop/scss-demo
- mkdir scss css
- touch scss/style.scss
- start scss/style.scss
- node-sass -wr scss -o css
- vi scss/style.scss
```
@function px($px){
    @return $px/$designWidth*10 + rem;
}

$desiginWidth: 640;  // 640是设计稿的宽度，你需要根据设计稿的宽度填写

.child{
    width: px(320);
    height: px(160);
    margin: px(40) px(40);
}
```
- 即可实现px自动变rem
