var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

// canvas大小自适应
autoSetCanvasSize(yyy);

// 监听用户点击事件
var eraserEnabled = false;

// 画笔橡皮擦切换
pen.onclick = function(){
  eraserEnabled = true;
  pen.classList.add('active');
  eraser.classList.remove('active');
}

eraser.onclick = function(){
  eraserEnabled = false;
  eraser.classList.add('active');
  pen.classList.remove('active');
}

red.onclick = function(){
  red.classList.add('active');
  green.classList.remove('active');
  blue.classList.remove('active');
  context.fillStyle = 'red';
  context.strokeStyle = 'red';
}

green.onclick = function(){
  green.classList.add('active');
  red.classList.remove('active');
  blue.classList.remove('active');
  context.fillStyle = 'green';
  context.strokeStyle = 'green';
}

blue.onclick = function(){
  blue.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  context.fillStyle = 'blue';
  context.strokeStyle = 'blue';
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
  context.fillStyle = 'black';
  context.arc(x, y, radius, 0, Math.PI*2);
  context.fill();
}

function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(x1, y1); // 起点
  context.lineWidth = 5;
  context.lineTo(x2, y2); // 终点
  context.stroke();
  context.closePath();
}
