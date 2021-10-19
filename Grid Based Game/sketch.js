// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid  = [];
let gridSize = 10;
let gridSide;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  gridSide = height/10;
  
  create2DArray();
}

function draw() {
  background(220);
  displayGrid();
  // rect(mouseX, mouseY, 100, 50);
}
function create2DArray() {
  for (let x = 0; x < gridSize; x++) {
    grid.push([]);
    for (let y = 0; y < gridSize; y++) {
      grid[x].push(0);
    }
  }
}

function displayGrid() {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      rect(x * gridSide, y * gridSide, gridSide, gridSide);
    }
  }
}

function generateBlock() {}

function mousePressed() {
  