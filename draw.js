/* The code for this application is intentionally unstructured and inefficient.  The goal of this exercise
 * was to gain perspective on deadlines and using a naive approach to accomplish goals in a short time.  In no
 * way does the author endorse these techniques and practices for legitimate production grade applications. */

var pageLoad = function(){
  var canvasEl = document.querySelector('canvas');
  var canvas = canvasEl.getContext('2d');
  var color = 'black';
  var weight = 3;
  var shapre = 'line';
  var colorEl = document.getElementById('color');
  var weightEl = document.getElementById('weight');
  var shapeEl = document.getElementById('shape');

  var colorButtons = document.getElementsByClassName('colorButton');
  var eraserButton = document.getElementById('eraserButton');

  var lineButton = document.getElementById('lineButton');
  var squareButton = document.getElementById('squareButton');
  var circleButton = document.getElementById('circleButton');
  
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
    canvas.beginPath();
  });

  canvasEl.addEventListener('mousemove', function(mouse){
    if(dragging){
      canvas.lineTo(mouse.layerX, mouse.layerY);
      canvas.strokeStyle = color;
      canvas.lineWidth = weight;
      if(color === 'white'){
        canvas.lineWidth = 10;
      }
      canvas.stroke();
    }
  });

  document.addEventListener('mouseup', function(mouse){
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
    weightEl.textContent = 'skinny';
  });

  normalButton.addEventListener('click', function(){
    weight = 3;
    weightEl.textContent = 'normal';
  });

  thickButton.addEventListener('click', function(){
    weight = 7;
    weightEl.textContent = 'thick';
  });

  squareButton.addEventListener('click', function(){
    shape = 'square';
    shapeEl.textContent = 'square';
  });

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
    downloader.download = 'dice.png'; 
    downloader.href = canvasEl.toDataURL('image/png');
    downloader.click();
  });
  
  
  for(var i = 0; i < colorButtons.length; i++){
    colorButtons[i].addEventListener('click', function(buttonClicked){
      color = buttonClicked.target.textContent;
      colorEl.textContent = color;
    });
  }

}

document.addEventListener('DOMContentLoaded', pageLoad);



