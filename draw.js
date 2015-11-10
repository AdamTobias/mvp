/* The code for this application is intentionally unstructured and inefficient.  The goal of this exercise
 * was to gain perspective on deadlines and using a naive approach to accomplish goals in a short time.  In no
 * way does the author endorse these techniques and practices for legitimate production grade applications. */

var pageLoad = function(){
  var canvasEl = document.querySelector('canvas');
  var canvas = canvasEl.getContext('2d');
  var color = 'black';
  var weight = 3;
  var shape = 'line';
  var shapeSize = 20;
  var fill = false;
  var drag = false;
  var startX, startY;

  var colorEl = document.getElementById('color');
  var weightEl = document.getElementById('weight');
  var shapeEl = document.getElementById('shape');
  var fillEl = document.getElementById('fill');

  var colorButtons = document.getElementsByClassName('colorButton');
  var eraserButton = document.getElementById('eraserButton');

  var lineButton = document.getElementById('lineButton');
  var squareButton = document.getElementById('squareButton');
  var circleButton = document.getElementById('circleButton');
  var fillButton = document.getElementById('fillButton');
  
  var saveButton = document.getElementById('saveButton');
  var loadButton = document.getElementById('loadButton');
  var inputBar = document.querySelector('input');

  var skinnyButton = document.getElementById('skinnyButton');
  var normalButton = document.getElementById('normalButton');
  var thickButton = document.getElementById('thickButton');

  var webLoadButton = document.getElementById('webLoadButton');
  var displayImage;
  var downloadButton = document.getElementById('DLButton');

  var dragging = false;
  
  canvasEl.addEventListener('mousedown', function(e){
    e.preventDefault();  //This prevents the cursor from becoming an I-beam
    dragging = true;
    if(drag){
      startX = e.layerX;
      startY = e.layerY;
    } else {
      if(shape === 'square'){
        if(fill){
          canvas.fillStyle = color;
          canvas.fillRect(e.layerX - shapeSize/2, e.layerY - shapeSize/2, shapeSize, shapeSize);
        } else {
          canvas.beginPath();
          canvas.rect(Math.floor(e.layerX - shapeSize/2) + 0.5, Math.floor(e.layerY - shapeSize/2)+0.5, shapeSize, shapeSize);
          canvas.stroke();
          canvas.closePath();
        }
      } else if (shape === 'line') {
        canvas.beginPath();
      } else if (shape === 'circle'){
        canvas.beginPath();
        canvas.arc(Math.floor(e.layerX)+0.5, Math.floor(e.layerY)+0.5 , shapeSize, 0, 2 * Math.PI);
        canvas.stroke();
        canvas.closePath();
        if(fill){
          canvas.fill();
        }
      }
    }
  });

  canvasEl.addEventListener('mousemove', function(mouse){
    if(dragging){
      if(shape === 'line'){
        canvas.lineTo(mouse.layerX, mouse.layerY);
        canvas.strokeStyle = color;
        canvas.lineWidth = weight;
        if(color === 'white'){
          canvas.lineWidth = 10;
        }
        canvas.stroke();
      }
    }
  });

  document.addEventListener('mouseup', function(mouse){
    if(dragging && drag){
      if(shape === 'square'){
        canvas.beginPath();
        canvas.rect(Math.floor(startX) + 0.5, Math.floor(startY)+0.5, Math.abs(mouse.layerX - startX), Math.abs(mouse.layerY - startY));
        canvas.stroke();
        canvas.closePath();
      } else if (shape === 'circle'){
        canvas.beginPath();
        canvas.arc(Math.floor((startX + mouse.layerX) / 2)+0.5, Math.floor((startY + mouse.layerY) / 2)+0.5 , Math.abs((mouse.layerX - startX)/2), 0, 2 * Math.PI);
        canvas.stroke();
        canvas.closePath();
      }
      if(fill){
        canvas.fill();
      }
    }
    dragging = false;
  });

  eraserButton.addEventListener('click', function(){
    color = 'white';
    colorEl.textContent = 'eraser';
  });

  saveButton.addEventListener('click', function(){
    var canvasData = canvasEl.toDataURL('image/png');
    var xhr = new XMLHttpRequest();

    xhr.open('POST', inputBar.value);
    xhr.overrideMimeType("text/plain; charset=x-user-defined")
    xhr.send(JSON.stringify({data: canvasData}));
    
    inputBar.value = '';
    xhr.onreadystatechange = function () {
      var DONE = 4; 
      var OK = 200; 
      if (xhr.readyState === DONE) {
        if (xhr.status !== OK) {
          console.log('Error: ' + xhr.status); 
        }
      }
    };

  });

  loadButton.addEventListener('click', function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', inputBar.value);
    xhr.send();
    
    inputBar.value = '';
    
    xhr.onreadystatechange = function () {
      var DONE = 4; 
      var OK = 200; 
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          displayImage = new Image();
          displayImage.src = 'data:image/png;base64,' + xhr.responseText;
          canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);
          canvas.drawImage(displayImage, 0, 0);
        } else {
          console.log('Error: ' + xhr.status);
        }
      }
    };

  });

  clearButton.addEventListener('click', function(){
    canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);
  });

  skinnyButton.addEventListener('click', function(){
    weight = 1;
    shapeSize = 10;
    weightEl.textContent = 'Small';
  });

  normalButton.addEventListener('click', function(){
    weight = 3;
    shapeSize = 20;
    weightEl.textContent = 'Medium';
  });

  thickButton.addEventListener('click', function(){
    weight = 7;
    shapeSize = 30;
    weightEl.textContent = 'Big';
  });

  squareButton.addEventListener('click', function(){
    shape = 'square';
    shapeEl.textContent = 'Square';
  });

  lineButton.addEventListener('click', function(){
    shape = 'line';
    shapeEl.textContent = 'Line';
  });

  circleButton.addEventListener('click', function(){
    shape = 'circle';
    shapeEl.textContent = 'Circle';
  });

  dragButton.addEventListener('click', function(){
    drag = !drag;
    console.log(drag);
  });

  fillButton.addEventListener('click', function(){
    fill = !fill;
    if(fill){
      fillEl.textContent = 'Fill';
    } else {
      fillEl.textContent = 'No Fill';
    }
  })

  webLoadButton.addEventListener('click', function(){
    displayImage = new Image();
    displayImage.onload = function(){
      console.dir(displayImage);
      canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);
      canvas.drawImage(displayImage, 0, 0);
    }
    displayImage.src = inputBar.value;
    inputBar.value = '';
  });

  downloadButton.addEventListener('click', function(){
    var downloader = document.createElement('a');
    downloader.download = inputBar.value; 
    downloader.href = canvasEl.toDataURL('image/png');
    downloader.click();
    inputBar.value = '';
  });
  
  
  for(var i = 0; i < colorButtons.length; i++){
    colorButtons[i].addEventListener('click', function(buttonClicked){
      color = buttonClicked.target.textContent;
      canvas.strokeStyle = color;
      canvas.fillStyle = color;
      colorEl.textContent = color;
    });
  }

}

document.addEventListener('DOMContentLoaded', pageLoad);



