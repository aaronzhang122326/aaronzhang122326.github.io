// Final project Rough draft
// Aaron Su
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;

let pause = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  y = 0;
}

function draw() {
  if (pause === false){
    background(220);
    rect(x, y, 50, 50);
    x += 1;
  }

  else if (pause === true) {

  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    pause = !pause; 
  }
}

function restart() {
  //reset variables 
}