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
  console.log(frameCount % 20 === 0);
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

// function generateBlock() {
  
//   let rowOneLength = random(0,3);
//   let rowTwoLength = random(0,3);


//   // blockList = [];
//   let blockListX = 0;

//   blockListZ += 1;
//   blockList.push([]);
//   blockList[blockListZ].push([],[]);

//   for (let x = 0; x < rowOneLength; x++) {
//     blockList[blockListZ][blockListY].push(1);
//     blockListY += 1;
//     // grid[0][x + rowOnePosition-1] = 1;
//   }

//   for (let x = 0; x < rowTwoLength; x++) {
//     blockList[blockListZ][blockListY].push(1);
//     // grid[1][x + rowTwoPosition-1] = 1;
//   }
// }

function generateBlock() {
  blockList.push(random(blockChoices));
  blockListZ += 1;

  positionY = 0;
  positionX = round(random(0, gridWidth-blockList[blockListZ][0].length));
  start = true;
}

// function displayBlocks() { 
//   let rowOnePosition = round(random(1, gridWidth-rowOneLength));
//   let rowTwoPosition = round(random(rowOnePosition, rowOnePosition + rowOneLength -1));
  
  
//     }
//   }
// }&& blockList[blockListZ][], blockList[blockListZ][0].length

function moveDown() {
  if (start === true) {
    if (frameCount % 20 === 0 && positionY + blockList[blockListZ].length <= gridHeight) {   
      for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {
          grid[y+positionY][x+positionX] = blockList[blockListZ][y][x]; 
          if (positionY > 0){
            grid[y+positionY-1][x+positionX] = 0;
          }
        }
      } 
      grid = [...newGrid];
      positionY += 1;
    }
  }

  else {
    start = false;
  }
}

function mousePressed() {
  generateBlock();
  
}

function keyPressed() {
  // moveDown();
}
