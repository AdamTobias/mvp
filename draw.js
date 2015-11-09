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

  saveButton.addEventListener('click', function(){
    // var clone = canvasEl.cloneNode(true);
    // var image = new Image();
    // var source = canvasEl.toDataURL('image/png');
    // var sourceString = source.toString();

    // console.log('source = ' + typeof source + ' --- ' + source);

    // image.src = source;
    

    // clone.getContext('2d').drawImage(image, 0 ,0);
    // document.querySelector('body').appendChild(clone);
    var canvasData = canvasEl.toDataURL('image/png');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'saveData');
    //xhr.send({imageData: canvasData});
    xhr.send(canvasData);

    xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          console.log('Received response: ', xhr.responseText); // 'This is the returned text.'
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }
    };

  });

  loadButton.addEventListener('click', function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'saveData');
    //xhr.send({imageData: canvasData});
    xhr.send();
    
    xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          console.log('Received response: ', xhr.responseText); // 'This is the returned text.'
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }
    };

  });

}

document.addEventListener('DOMContentLoaded', pageLoad);



