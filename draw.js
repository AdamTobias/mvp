var pageLoad = function(){
  var canvasEl = document.querySelector('canvas');
  var canvas = canvasEl.getContext('2d');
  var color = 'green';
  var redButton = document.getElementById('redButton');
  var blackButton = document.getElementById('blackButton');
  var eraserButton = document.getElementById('eraserButton');
  var saveButton = document.getElementById('saveButton');
  var loadButton = document.getElementById('loadButton');


  var dragging = false;
  
  canvasEl.addEventListener('mousedown', function(){
    dragging = true;
    canvas.beginPath();
  });

  canvasEl.addEventListener('mousemove', function(mouse){
    if(dragging){
      canvas.lineTo(mouse.layerX, mouse.layerY);
      canvas.strokeStyle = color;
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
  });

  blackButton.addEventListener('click', function(){
    color = 'black';
  });

  eraserButton.addEventListener('click', function(){
    color = 'white';
  });

  saveButton.addEventListener('click', function(){
    var canvasData = canvasEl.toDataURL('image/png');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'saveData');
    xhr.send(canvasData);

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
    xhr.open('GET', 'saveData');
    xhr.send();
    
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
}

document.addEventListener('DOMContentLoaded', pageLoad);



