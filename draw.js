var pageLoad = function(){
  var canvasEl = document.querySelector('canvas');
  var canvas = canvasEl.getContext('2d');
  var color = 'green';
  var redButton = document.getElementById('redButton');
  var blackButton = document.getElementById('blackButton');
  var eraserButton = document.getElementById('eraserButton');

  var dragging = false;
  
  canvasEl.addEventListener('mousedown', function(){
    dragging = true;
    canvas.beginPath();
  });

  canvasEl.addEventListener('mousemove', function(mouse){
    if(dragging){
      canvas.lineTo(mouse.layerX, mouse.layerY);
      canvas.strokeStyle = color;
      console.log(canvas.lineWidth);
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

}

document.addEventListener('DOMContentLoaded', pageLoad);



