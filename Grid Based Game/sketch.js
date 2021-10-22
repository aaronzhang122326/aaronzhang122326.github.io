// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let number = 0;
let grid;
let newGrid = [];
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
  for (let y = 0; y < gridSize; y++) {
    newGrid.push([]);
    for (let x = 0; x < gridSize; x++) {
      newGrid[y].push(0);
    }
  }
}

function displayGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (newGrid[y][x] === 0) {
        fill("white");
      }

      else if (newGrid[y][x] === 1) {
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
  let rowTwoPosition = round(random(rowOnePosition, rowOnePosition + rowOneLength -1));

  for (let x = 0; x < rowOneLength; x++) {
    newGrid[0][x + rowOnePosition-1] = 1;
  }

  for (let x = 0; x < rowTwoLength; x++) {
    newGrid[1][x + rowTwoPosition-1] = 1;
  }
}

function moveDown() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        newGrid[y+1][x] = 1;
        newGrid[y][x] = 0;
      }
    }
  }
  grid = newGrid;
}

function mousePressed() {
  console.log("1");
  generateBlock();
  console.log("2");
  moveDown();
  console.log("3");
}
