// Practice 
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSize = 10
let grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  create2DArray();
}

function draw() {
  background(220);
  display();

  // createEmptyArray();
  
}

function createEmptyArray() {
  grid = [];
}

function display() {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (grid[x][y] === 0) {
        fill("white");
      }
      else {
        fill("black");
      }
      rect(x * width/gridSize, y * height/gridSize, width/gridSize, height/gridSize);
    }
  }
}

function create2DArray() {
  for (let x = 0; x < gridSize; x++) {
    grid.push([]);
    for (let y = 0; y < gridSize; y++) {
      if (random(0, 100) <= 50) {
        grid[x].push(0);
      }
      else {
        grid[x].push(1);
      }
    }
  }
}
