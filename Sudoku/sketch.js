// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let initialGrid = [
  [2, 0, 5, 0, 0, 7, 0, 0, 6],
  [4, 0, 0, 9, 6, 0, 0, 2, 0],
  [0, 0, 0, 0, 8, 0, 0, 4 ,5],
  [9, 8, 0, 0, 7, 4, 0, 0, 0],
  [5, 7, 0, 8, 0, 2, 0, 6, 9],
  [0, 0, 0, 6, 3, 0, 0, 5, 7],
  [7, 5, 0, 0, 2, 0, 0, 0, 0],
  [0, 6, 0, 0, 5, 1, 0, 0, 2],
  [3, 0, 0, 4, 0, 0, 5, 0, 8],
];

let gridDimensions = 9;
let cellSize;
let grid;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowHeight);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  
  cellSize = width/gridDimensions;//error
  grid = initialGrid;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y<gridDimensions; y++) {
    for (let x = 0; x<gridDimensions; x++) {
      fill("white");
      strokeWeight(1);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);

      //show the number 
      // if (grid[y][x] !== 0) {
      //   fill("black");
      //   textSize(cellSize*0.75);
      //   textAlign(CENTER, CENTER);
      //   text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);
      // }
    } 
    // drawCageLines();
  }
}

//checkout why it didn't work without this code
function drawCageLines() {
  strokeWeight(4);
  for (let location = 0; location <= 9; location += 3) {
    line(0, cellSize * location, width, cellSize* location);
    line(cellSize * location, 0, cellSize*location, height);  
  }
}