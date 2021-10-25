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
let blockList;
let blockListZ = -1;
let blockListY = 0;
let positionY = 0;
let positionX;
let start = false;
let left = false;
let right = false;
let nextMove = true;

let iBlocks = [
  [1,1,1,1,1],
];

let jBlocks = [
  [1,0,0,0],
  [1,1,1,1],
];
              
let lBlocks = [
  [0,0,0,1],
  [1,1,1,1],
];

let oBlocks = [
  [1,1],
  [1,1],
];

let tBlocks = [
  [0,1,0],
  [1,1,1],
];

let sBlocks = [
  [0,1,1],
  [1,1,0],
];

let zBlocks = [
  [1,1,0],
  [0,1,1],
];

let blockChoices = [iBlocks, jBlocks, lBlocks, oBlocks, tBlocks, sBlocks, zBlocks];

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  grid = create2DArray();
  gridSide = height/gridHeight;
  newGrid = create2DArray();
  blockList = [];
}



function draw() {
  background(220);
  displayGrid();
  moveDown();
  // console.log(positionY);

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
  blockList.push(random(blockChoices));
  blockListZ += 1;

  positionY = 0;
  positionX = round(random(0, gridWidth-blockList[blockListZ][0].length));
  start = true;
}

function moveDown() {


  if (start === true) {    
    if (frameCount % 20 === 0 && positionY + blockList[blockListZ].length-2 <= gridHeight) {   
      for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {
          grid[y+positionY][x+positionX] = blockList[blockListZ][y][x]; 
          if (positionY > 0){
            grid[y+positionY-1][x+positionX] = 0;
          }
        }
      } 
        
      if (left === true) { // can possibly simplify
        if (grid[positionY][positionX + blockList[blockListZ][blockListY].length] === 1) {
          grid[positionY][positionX + blockList[blockListZ][blockListY].length] = 0;
        }
        if (positionY > 0) {
          if (grid[positionY-1][positionX + blockList[blockListZ][blockListY].length] === 1) {
            grid[positionY-1][positionX + blockList[blockListZ][blockListY].length] = 0;
          }
        }
        left = false;
      }

      if (right === true) {
        if (grid[positionY][positionX-1] === 1) {
          grid[positionY][positionX-1] = 0;
        }
        if (positionY > 0) {
          if (grid[positionY-1][positionX-1] === 1) {
            grid[positionY-1][positionX-1] = 0;
          }
        }
        right = false;
      }

      positionY += 1;
    }
  }
  
  if (start === true) {
    for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
      for (let x = 0; x < blockList[blockListZ][y].length; x++) {              
        if (positionY + blockList[blockListZ].length -1 === gridHeight) {
          start = false;   
        }  
        else if (y+positionY + 1 < gridHeight) {          
          if (grid[y+positionY+1][x+positionX] === 1 && grid[y+positionY-1][x+positionX] === 1) {
            start = false;
            if (frameCount % 20 === 0) {
              for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
                for (let x = 0; x < blockList[blockListZ][y].length; x++) {
                  grid[y+positionY][x+positionX] = blockList[blockListZ][y][x]; 
                  if (positionY > 0){
                    grid[y+positionY-1][x+positionX] = 0;
                  }
                }
              }
            }
            // console.log(grid[y+positionY+1][x+positionX]);
            
          }
        }
      }
    }
  }
  nextMove = true;
}

function mousePressed() {
  generateBlock();
  
}

function keyPressed() {
  if (keyCode === 65 && start === true && nextMove === true) {
    positionX -= 1;
    left = true;
    nextMove = false;

  }
  else if (keyCode === 68 && start === true) {
    positionX += 1;
    right = true;
  }
  else if (keyCode === 83 && start === true) {
    // positionX += 1;
  }
}
