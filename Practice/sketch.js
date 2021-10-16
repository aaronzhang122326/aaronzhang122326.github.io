// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

<<<<<<< HEAD
let rectHeights = [];
let numOfRects;
let x = 1;
let y;



function setup() {
  createCanvas(windowWidth, windowHeight);
  numOfRects = width;
  setTerrain();
=======

function setup() {
  createCanvas(windowWidth, windowHeight);
>>>>>>> b7ad8dd21d1a06a4463e4c01ffce43817bfa3962
}

function draw() {
  background(220);
<<<<<<< HEAD
  displayTerrain();
  fill("black");
  rect(100,100,100,100);
}

function displayTerrain() {
  for (let i = 0; i < numOfRects; i++) {
    fill("black");
    rect(x * i, height, 10, -rectHeights[i]);
  }
}

function setTerrain(){
  let time = 0;
  for (let i = 0; i <= numOfRects; i++) {
    rectHeights.push(noise(time) * height);
    time += 0.002;
  }
}
=======

  rect(mouseX, mouseY, 100, 50);
}
>>>>>>> b7ad8dd21d1a06a4463e4c01ffce43817bfa3962
