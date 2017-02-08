// THERE ARE NOT TWO SKETCHES RUNNING
// THERE ARE TWO INSTANCES OF THE SAME SKETCH ***************

var socket;
var myCanvas;


function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('myContainer');
  background(51);
  stroke(7);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  // noStroke();
  fill(0, 0, 100);
  line(data.x, data.y, pmouseX, pmouseY);
}

function mouseDragged() {
  console.log('Sending: ' + mouseX + ' , ' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);

  // noStroke();
  fill(255);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function draw() {
}
