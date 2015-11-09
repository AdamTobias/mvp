var pageLoad = function(){
  var canvasEl = document.querySelector('canvas');
  var canvas = canvasEl.getContext('2d');
  var color = 'black';
  var colorEl = document.getElementById('color');
  var weight = 3;
  var weightEl = document.getElementById('weight');
  var redButton = document.getElementById('redButton');
  var blackButton = document.getElementById('blackButton');
  var eraserButton = document.getElementById('eraserButton');
  var saveButton = document.getElementById('saveButton');
  var loadButton = document.getElementById('loadButton');
  var inputBar = document.querySelector('input');
  var skinnyButton = document.getElementById('skinnyButton');
  var normalButton = document.getElementById('normalButton');
  var thickButton = document.getElementById('thickButton');


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

  redButton.addEventListener('click', function(e){
    color = 'red';
    colorEl.textContent = color;
  });

  blackButton.addEventListener('click', function(){
    color = 'black';
    colorEl.textContent = color;
  });

  eraserButton.addEventListener('click', function(){
    color = 'white';
    colorEl.textContent = 'eraser';
  });

  saveButton.addEventListener('click', function(){
    var canvasData = canvasEl.toDataURL('image/png');
    var xhr = new XMLHttpRequest();

    xhr.open('POST', inputBar.value);
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
          var image = new Image();
          image.src = xhr.responseText;
          canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);
          canvas.drawImage(image, 0, 0);
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
}

document.addEventListener('DOMContentLoaded', pageLoad);



