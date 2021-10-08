// Ball Array Demo
// Your Name
// October 7. 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i<10; i++) {
    spawnBall();
  }
}

function draw() {
  background("black");

  for (let myBall of ballArray) {
    noStroke();
    fill(myBall.theColor);
    myBall.x = noise(myBall.time) * width;
    myBall.y = noise(myBall.time + 100)*height;
    circle(myBall.x, myBall.y, myBall.radius*2);
    myBall.time += 0.003;
  }
}

function mousePressed() {
  for (let i < 5; i)
}

function spawnBall() {
  let myBall = {
    radius: random(10, 30),
    x: random(width),
    y: random(height),
    time: random(1, 1000),
    theColor: color(random(255), random(255), random(255), random(255)), 
  };
  ballArray.push(myBall);
}