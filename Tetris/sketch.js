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
let newX;

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
  moveBlock();
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
function findEdge(direction, row) {
  if (direction === 1) {
    for (let x = blockList[blockListZ][row-1].length-1; x >= 0; x--) {
      if (grid[positionY+row-1][positionX + blockList[blockListZ][blockListY].length] === 1) {
        console.log(x);
        return grid[positionY+row-1][positionX + blockList[blockListZ][blockListY].length] = 0;
        
      }
    }
  }
}

function generateBlock() {
  let edge;
  blockList.push(random(blockChoices));
  blockListZ += 1;

  positionY = 0;
  positionX = round(random(0, gridWidth-blockList[blockListZ][0].length));

  start = true;
}

function moveDown() {
  if (start === true) {//after block have been spawned    
    if (frameCount % 60 === 0) {
      positionY += 1;
    }
    if (frameCount % 10 === 0) {
      for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {
          // grid[y+positionY][x+positionX] = blockList[blockListZ][y][x]; 
          if (blockList[blockListZ][y][x] === 1){
            grid[y+positionY][x+positionX] = blockList[blockListZ][y][x]; 
          }
          if (y+positionY + 1 < gridHeight && positionY > 1) {          
            if (blockList[blockListZ][y][x] === 1 && (y === blockList[blockListZ].length-1 || blockList[blockListZ][y+1][x] === 0)) {
              if (grid[y+positionY+1][x+positionX] === 1) {//bug 
                start = false;
              }
            }
          }
          if (frameCount % 60 === 0) { //possible bug
            if (positionY > 0) {
              grid[y+positionY-1][x+positionX] = 0;
            }
          }
        }
        if (left === true && frameCount % 10 === 0) {  
          findEdge(1, 2);
        }
        
          if (positionY > 0) {
            findEdge(1, 1);
          }

          if (frameCount % 60 === 0) {
            grid[positionY-1][positionX + blockList[blockListZ][blockListY].length] = 0;
          }
          left = false;
          nextMove = true;

    
          // if (grid[positionY+1][positionX + blockList[blockListZ][blockListY].length] === 1) { //problem
          //   grid[positionY+1][positionX + blockList[blockListZ][blockListY].length] = 0;
          // }
          // if (positionY > 0) {
          //   if (grid[positionY][positionX + blockList[blockListZ][blockListY].length] === 1) {
          //     grid[positionY][positionX + blockList[blockListZ][blockListY].length] = 0;
          //   }
          // }

          // if (frameCount % 60 === 0) {
          //   grid[positionY-1][positionX + blockList[blockListZ][blockListY].length] = 0;
          // }
          // left = false;
          // nextMove = true;
        // }
        if (right === true && frameCount % 10 === 0) {
          if (grid[positionY+1][positionX-1] === 1) {      
            grid[positionY+1][positionX-1] = 0;
          }
          if (positionY > 0) {
            if (grid[positionY][positionX-1] === 1) {
              grid[positionY][positionX-1] = 0;
            }
          }      
          if (frameCount % 60 === 0) { //fixing bug
            grid[positionY-1][positionX-1] = 0;
            // console.log("1");
          }
          right = false;
          nextMove = true;
        }
      }
    }
  }


  
  if (start === true) {//when to stop the block
    for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
      for (let x = 0; x < blockList[blockListZ][y].length; x++) {              
        if (positionY + blockList[blockListZ].length  === gridHeight) {
          start = false;   
        }  
      }//code
    }
  }
}

function mousePressed() {
  generateBlock();
  
}

function moveBlock() { //
  if (keyIsDown(65) && start === true && nextMove === true) {
    nextMove = false;
    positionX -= 1;
    left = true;
  }
  else if (keyIsDown(68) && start === true && nextMove === true) {
    nextMove = false;
    positionX += 1;
    right = true;
  }
}
