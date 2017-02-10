function setup() {
  var canvas = createCanvas(windowWidth/2, windowHeight);
  strokeWeight(7);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  background(255, 0, 200);
}

function draw() {
  // start and stop drawing if mouse pressed
  if (mouseIsPressed == true){
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

// works
// function mouseClicked(){
//   save('myCanvas.png');
//   return false;
// }

// CAPTURE SCREENSHOT WHEN YOU CLICK PUBLISH
// function screenshot() {
//   save('myCanvas.png');
//   console.log('here');
// }
//
// var publishBtn = document.getElementById('publish');
// publishBtn.mouseClicked('click', screenshot);

var publishBtn = document.getElementById('publish');
publishBtn.onclick = function screenshot() {
  console.log('clicked');
  save('myCanvas.png');
  return false;
}
