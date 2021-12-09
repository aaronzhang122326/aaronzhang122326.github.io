// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let theColors = ["black", "red", "blue", "yellow", "green", "orange", "purple", "violet"];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  recursiveCircle(width/2, height, 0);
}

function recursiveCircle(x, diameter, level) {
  fill(theColors[level]);
  circle(x, height/2, diameter);

  if (diameter > 10) {
    recursiveCircle(x - 0.25*diameter, diameter/2, level + 1);
    recursiveCircle(x + 0.25*diameter, diameter/2, level + 1);
  }
}