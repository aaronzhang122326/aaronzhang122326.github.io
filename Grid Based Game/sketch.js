// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let number = 0;
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
      if (grid[x][y] === 0) {
        fill("white");
      }

      else if (grid[x][y] === 1) {
        fill("black");
      }

      rect(x * gridSide, y * gridSide, gridSide, gridSide);
    }
  }
}

function generateBlock() {
  //number += 1;
  let rowOneLength = random(0,3);
  let rowTwoLength = random(0,3);

  let rowOnePosition = round(random(1, gridSize-rowOneLength));
  let rowTwoPosition = round(random(rowOnePosition, rowOnePosition + rowOneLength));

  for (let x = 0; x < rowOneLength; x++) {
    grid[x + rowOnePosition-1][0] = 1;
  }

  for (let x = 0; x < rowTwoLength; x++) {
    grid[x + rowTwoPosition-1][1] = 1;
  }
}
function mousePressed() {
  generateBlock();
}