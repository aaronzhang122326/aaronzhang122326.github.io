// Grid Images Demo
// Your Name
// Date
//
// Extra for Experts:

// - describe what you did to take this project "above and beyond"
let gridSize = 30;
let grid;
let ding;
let grassImg;
let leafImg;

function preload() {  
  soundFormats("ogg");
  ding = loadSound("assets/ding.mp3");
  grassImg = loadImage("assets/grass.png");
  leafImg = loadImage("assets/leaves.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  grid = createRandom2DArray(gridSize, gridSize);
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed(){
  let cellWidth = width/gridSize;
  let cellHeight = height/gridSize;

  let cellX = Math.floor(mouseX/cellWidth);
  let cellY = Math.floor(mouseY/cellHeight);

  swap(cellX, cellY);
  swap(cellX+1, cellY);
  swap(cellX-1, cellY);
  swap(cellX, cellY+1);
  swap(cellX, cellY-1);
  ding.play();
}

function swap(x, y) {
  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}

function displayGrid(){
  let cellWidth = width/gridSize;
  let cellHeight = height/gridSize;
  
  for (let y = 0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++){
      if (grid[y][x] === 0) {
        image(grassImg,x * cellWidth, y * cellHeight, cellWidth, cellHeight )
      }
      else if (grid[y][x] === 1) {
        image(leafImg, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
    }
  }
}

// function createEmpty2DArray(rows, cols) {
//   let grid = [];
//   for (let y = 0; y<rows; y++) {
//     grid.push([]);
//     for (let x=0; x<cols; x++) {
//       grid[y].push(0);
//     }
//   }
//   return grid;
// }

function createRandom2DArray(rows, cols) {
  let grid = [];
  for (let y = 0; y<rows; y++) {
    grid.push([]);
    for (let x=0; x<cols; x++) {
      if (random(100) < 50) {
        grid[y].push(1);
      }
      else {
        grid[y].push(0);
      }
    }
  }
  return grid;
}

function createEmpty2DArray(rows, cols, numsToFill = 0) {
  let grid = [];
  for (let y = 0; y<rows; y++) {
    grid.push([]);
    for (let x=0; x<cols; x++) {
      grid[y].push(numsToFill);
    }
  }
  return grid;
}

function keyPressed() {
  if (key === "e") {
    grid = createEmpty2DArray(gridSize, gridSize);
  }

  if (key === "b") {
    grid = createEmpty2DArray(gridSize, gridSize, 1);
  }
  if (key === "r") {
    grid = createRandom2DArray(gridSize, gridSize);
  }
}
