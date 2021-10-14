// Game of Life Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];
let gridSize = 10;
// let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2DArray(gridSize, gridSize);
}

function draw() {
  background(220);
  display2DArray();
  
}

function createRandom2DArray() {
  for (let y = 0; y < 1; y++) {
    grid.push([]);
    // for (let x = 0; x < 10; x++) {
    //   grid[y].push(0);
    // }
  }
  return grid;
}
 
function display2DArray() {
  createRandom2DArray();
}