// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let number = 0;
let grid;
let newGrid;
let gridHeight = 20;
let gridWidth = 10;
let gridSide;

function setup() {

  createCanvas(windowWidth, windowHeight);

  grid = create2DArray();
  gridSide = height/gridHeight;
  
  //create2DArray();
}

function draw() {
  background(220);
  displayGrid();
  // rect(mouseX, mouseY, 100, 50);
}
function create2DArray() {
  let screen = [];
  for (let y = 0; y < gridHeight; y++) {
    screen.push([]);
    for (let x = 0; x < gridWidth; x++) {
      screen[y].push(0);
    }
  }
  return screen;
}

function displayGrid() {
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }

      else if (grid[y][x] === 1) {
        fill("black");
      }

      rect(x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
    }
  }
}

function generateBlock() {
  //number += 1;
  let rowOneLength = random(0,3);
  let rowTwoLength = random(0,3);

  let rowOnePosition = round(random(1, gridWidth-rowOneLength));
  let rowTwoPosition = round(random(rowOnePosition, rowOnePosition + rowOneLength -1));

  for (let x = 0; x < rowOneLength; x++) {
    grid[0][x + rowOnePosition-1] = 1;
  }

  for (let x = 0; x < rowTwoLength; x++) {
    grid[1][x + rowTwoPosition-1] = 1;
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
  newGrid = grid;
  generateBlock();
  moveDown();
}
