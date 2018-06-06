var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var defaultLineWidth = 5;

// canvas大小自适应
autoSetCanvasSize(yyy);

// 监听用户点击事件
var eraserEnabled = false;

// 画笔橡皮擦切换
pen.onclick = function(){
  eraserEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
}

eraser.onclick = function(){
  eraserEnabled = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
}

clear.onclick = function(){
  context.clearRect(0,0,yyy.width,yyy.height);
}

download.onclick = function(){
  var url = yyy.toDataURL('image/png');
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = 'xxx';
  a.click();
}


black.onclick = function(){
  black.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
  context.fillStyle = 'black';
  context.strokeStyle = 'black';
}

red.onclick = function(){
  red.classList.add('active');
  black.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
  context.fillStyle = 'red';
  context.strokeStyle = 'red';
}

green.onclick = function(){
  green.classList.add('active');
  black.classList.remove('active');
  red.classList.remove('active');
  blue.classList.remove('active');
  context.fillStyle = 'green';
  context.strokeStyle = 'green';
}

blue.onclick = function(){
  blue.classList.add('active');
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
  context.fillStyle = 'blue';
  context.strokeStyle = 'blue';
}

small.onclick = function(){
  defaultLineWidth = 5;
}

big.onclick = function(){
  defaultLineWidth = 10;
}

// 监听用户鼠标事件
listenToMouse(yyy);

function autoSetCanvasSize(canvas){
  setCanvasSize();
  
  window.onresize = function(){
    setCanvasSize();
  }
  
  function setCanvasSize(){
    var pageWidth =     document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
  
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

function listenToMouse(canvas){
  var using = false;
  
  var beginPath = {
    "x": undefined,
    "y": undefined
  };
  var endPath = {
    "x": undefined,
    "y": undefined
  };

  if(document.body.ontouchstart !== undefined){
    // 触屏设备
    canvas.ontouchstart = function(event){
     var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        using = true;
        if(eraserEnabled){
          context.clearRect(x -5, y -5, 10, 10);
        }else{
          beginPath = {
            "x": x, 
            "y": y
          }; 
        }
    }

    canvas.ontouchmove = function(event){
      var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
      
        if(!using) {return;}
      
        if(eraserEnabled){
          context.clearRect(x -5, y - 5, 10, 10);
        }else{
           endPath = {
             "x": x, 
             "y": y
           };
          drawLine(beginPath.x, beginPath.y,endPath.x,endPath.y );
          beginPath = endPath;
        }
    }

    canvas.ontouchend = function(event){
      using = false;
    } 
  } else{
    // 电脑设备
    canvas.onmousedown = function(event){
        var x = event.clientX;
        var y = event.clientY;
        using = true;
        if(eraserEnabled){
          context.clearRect(x -5, y -5, 10, 10);
        }else{
          beginPath = {
            "x": x, 
            "y": y
          }; 
        }
      }

      canvas.onmousemove = function(){
        var x = event.clientX;
        var y = event.clientY;
      
        if(!using) {return;}
      
        if(eraserEnabled){
          context.clearRect(x -5, y - 5, 10, 10);
        }else{
           endPath = {
             "x": x, 
             "y": y
           };
          drawLine(beginPath.x, beginPath.y,endPath.x,endPath.y );
          beginPath = endPath;
        }
      }

      canvas.onmouseup = function(){
        using = false;
      }

  }
}


function drawCircle(x, y, radius){
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI*2);
  context.fill();
}

function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1, y1); // 起点
  context.lineWidth = defaultLineWidth;
  context.lineTo(x2, y2); // 终点
  context.stroke();
  context.closePath();
}
