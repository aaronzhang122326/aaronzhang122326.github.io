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

let a = 0;
let b = 1;
let rotateWidth;
let rotateHeight;

let canRotate = false;
let previousRotate;

let iBlocks = [
  [1,1,1,1],
];

let iBlocksTwo = [
  [1],
  [1],
  [1],
  [1],
];

let jBlocks = [
  [1,0,0],
  [1,1,1],
];

let jBlocksTwo = [
  [1,1],
  [1,0],
  [1,0],
];

let jBlocksThree = [
  [1,1,1],
  [0,0,1],
];

let jBlocksFour = [
  [0,1],
  [0,1],
  [1,1],
]
              
let lBlocks = [
  [0,0,1],
  [1,1,1],
];

let lBlocksTwo = [
  [1,0],
  [1,0],
  [1,1],
];

let lBlocksThree = [
  [1,1,1],
  [1,0,0],
];

let lBlocksFour = [
  [1,1],
  [0,1],
  [0,1],
];

let oBlocks = [
  [1,1],
  [1,1],
];

let tBlocks = [
  [0,1,0],
  [1,1,1],
];

let tBlocksTwo = [
  [1,0],
  [1,1],
  [1,0],
];

let tBlocksThree = [
  [1,1,1],
  [0,1,0],
];

let tBlocksFour = [
  [0,1],
  [1,1],
  [0,1],
];

let sBlocks = [
  [0,1,1],
  [1,1,0],
];

let sBlocksTwo = [
  [1,0],
  [1,1],
  [0,1],
];

let zBlocks = [
  [1,1,0],
  [0,1,1],
];

let zBlocksTwo = [
  [0,1],
  [1,1],
  [1,0],
];

let blockSetOne = [iBlocks, jBlocks, lBlocks, oBlocks, tBlocks, sBlocks, zBlocks, tBlocksThree, jBlocksThree, lBlocksThree];
let blockSetTwo = [iBlocksTwo, sBlocksTwo, zBlocksTwo, tBlocksTwo, tBlocksFour, jBlocksTwo, jBlocksFour, lBlocksTwo, lBlocksFour];

let iBlockSet = [iBlocks, iBlocksTwo];
let lBlockSet = [lBlocks, lBlocksTwo, lBlocksThree, lBlocksFour];
let tBlockSet = [tBlocks, tBlocksTwo, tBlocksThree, tBlocksFour];
let sBlockSet = [sBlocks, sBlocksTwo];
let zBlockSet = [zBlocks, zBlocksTwo]; 

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
  blockList.push(random(blockSetOne));
  blockListZ += 1;

  positionY = 0;
  positionX = round(random(0, gridWidth-blockList[blockListZ][0].length));

  start = true;
}

function moveDown() {
  if (start === true) {//after block have been spawned    
    if (frameCount % 10 === 0) {
      positionY += 1;
      b = 1;
    }

    else {
      b = 0;
    }
    if (frameCount % 5 === 0) {          
      if (right === true) {
        a = -1;
      }          
      else if (left === true) {
        a = 1;
      }
      else {
        a = 0;
      }
      for (let y = blockList[blockListZ].length-1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {
          if (grid[y+positionY-b][x+positionX+a] === 1) {
            grid[y+positionY-b][x+positionX+a] = 0; // possible bug
          }
        }
      }      

      if (canRotate && frameCount % 10 === 0) {
        rotateBlock();        
        positionY += rotateHeight;
        positionX += rotateWidth; 
        
        for (let y = blockList[blockListZ].length -1; y >= 0; y--) { // can possibly shorten
          for (let x = 0; x < blockList[blockListZ][y].length; x++) {
            if (grid[y+positionY][x+positionX] === 1 && blockList[blockListZ][y][x] === 1){
              positionY -= rotateHeight, positionX -= rotateWidth;
              blockList[blockListZ] = previousRotate;
            }
          }
        }
        canRotate = false; 
      }
      //where rotate has to happen
      for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {    
          if (blockList[blockListZ][y][x] === 1){
            grid[y+positionY][x+positionX] = blockList[blockListZ][y][x]; 
          }

          if (y+positionY + 1 < gridHeight && positionY > 1) {// stoping the block         
            if (blockList[blockListZ][y][x] === 1 && (y === blockList[blockListZ].length-1 || blockList[blockListZ][y+1][x] === 0)) {
              if (grid[y+positionY+1][x+positionX] === 1) {
                start = false;
                clearBlock();
              }
            }
          }
          if (frameCount % 10 === 0) { 
            if (positionY > 0) {
              grid[y+positionY-1][x+positionX] = 0;
            }
          }
        }
      }        
      left = false;
      right = false;
      nextMove = true;
    }
  }


  
  if (start === true) {//when to stop the block
    for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
      for (let x = 0; x < blockList[blockListZ][y].length; x++) {              
        if (positionY + blockList[blockListZ].length  === gridHeight) {
          start = false; 
          clearBlock();
        }  
      }
    }
      
  }
}

function rotateBlock() { //can shorten later
  if (blockList[blockListZ] === zBlocks && canRotate) { //zblocks rotation
    blockList[blockListZ] = zBlocksTwo;
    previousRotate = zBlocks;

  }
  else if (blockList[blockListZ] === zBlocksTwo && canRotate) {
    blockList[blockListZ] = zBlocks;
    previousRotate = zBlocksTwo;
  }

  else if (blockList[blockListZ] === sBlocks && canRotate) { //sblocks rotation
    blockList[blockListZ] = sBlocksTwo;
    previousRotate = sBlocks;
  }
  else if (blockList[blockListZ] === sBlocksTwo && canRotate) {
    blockList[blockListZ] = sBlocks;
    previousRotate = sBlocksTwo;
  }

  else if (blockList[blockListZ] === iBlocks && canRotate) {//iblocks rotation
    blockList[blockListZ] = iBlocksTwo;
    previousRotate = iBlocks;
  }
  else if (blockList[blockListZ] === iBlocksTwo && canRotate) {
    blockList[blockListZ] = iBlocks;
    previousRotate = iBlocksTwo;
  }    

  else if (blockList[blockListZ] === tBlocks && canRotate) { //tblocks rotation
    blockList[blockListZ] = tBlocksTwo;
    previousRotate = tBlocks;
  }
  else if (blockList[blockListZ] === tBlocksTwo && canRotate) {
    blockList[blockListZ] = tBlocksThree;
    previousRotate = tBlocksTwo;
  }
  else if (blockList[blockListZ] === tBlocksThree && canRotate) {
    blockList[blockListZ] = tBlocksFour;
    previousRotate = tBlocksThree;
  }
  else if (blockList[blockListZ] === tBlocksFour && canRotate) {
    blockList[blockListZ] = tBlocks;
    previousRotate = tBlocksThree;
  }    

  else if (blockList[blockListZ] === jBlocks && canRotate) { //jblocks rotation
    blockList[blockListZ] = jBlocksTwo;
    previousRotate = jBlocks;
  }
  else if (blockList[blockListZ] === jBlocksTwo && canRotate) {
    blockList[blockListZ] = jBlocksThree;
    previousRotate = jBlocksTwo;
  }
  else if (blockList[blockListZ] === jBlocksThree && canRotate) {
    blockList[blockListZ] = jBlocksFour;
    previousRotate = jBlocksThree;
  }
  else if (blockList[blockListZ] === jBlocksFour && canRotate) {
    blockList[blockListZ] = jBlocks;
    previousRotate = jBlocksFour;
  }    

  else if (blockList[blockListZ] === lBlocks && canRotate) { //lblocks rotation
    blockList[blockListZ] = lBlocksTwo;
    previousRotate = lBlocks;
  }
  else if (blockList[blockListZ] === lBlocksTwo && canRotate) {
    blockList[blockListZ] = lBlocksThree;
    previousRotate = lBlocksTwo;
  }
  else if (blockList[blockListZ] === lBlocksThree && canRotate) {
    blockList[blockListZ] = lBlocksFour;
    previousRotate = lBlocksThree;
  }
  else if (blockList[blockListZ] === lBlocksFour && canRotate) {
    blockList[blockListZ] = lBlocks;
    previousRotate = lBlocksFour;
  }   
  //code for other blocks 

  for (let x = 0; x < blockSetTwo.length; x++){
    if (blockList[blockListZ] === blockSetTwo[x]){
      return rotateHeight = -(floor((blockList[blockListZ].length-1)/2)), rotateWidth = floor((blockList[blockListZ].length-1)/2);
    }
  }

  for (let x = 0; x < blockSetOne.length; x++){
    if (blockList[blockListZ] === blockSetOne[x]){
      return rotateHeight = floor((blockList[blockListZ][0].length-1)/2), rotateWidth = -(floor((blockList[blockListZ][0].length-1)/2));
    }
  }
}

function mousePressed() {
  generateBlock();
}

function moveBlock() { //
  if (keyIsDown(65) && start === true && nextMove === true && frameCount % 60 !== 0 && grid[positionY][positionX-1] === 0 && grid[positionY+1][positionX-1] === 0) {
    nextMove = false;
    positionX -= 1;
    left = true;
  }
  else if (keyIsDown(68) && start === true && nextMove === true && frameCount % 60 !== 0 && grid[positionY][positionX+blockList[blockListZ][blockListY].length] === 0 && grid[positionY+1][positionX+blockList[blockListZ][blockListY].length] === 0) {
    nextMove = false;
    positionX += 1;
    right = true;
  }
}

function keyPressed() {
  if (keyCode === 87) {
    canRotate = true;
  }
}

function clearBlock(){
  for (let y = 0; y < gridHeight; y++) {
    let spaces = 0;
    for (let x = 0; x < gridWidth; x++) {
      if (grid[y][x] === 0) {
        spaces += 1;
      }
    }
    if (spaces === 0) {
      console.log("1");
      for (let x = 0; x < gridWidth; x++) {
        grid[y][x] = 0;
      }
      for (let a = y-1; a >= 0 ; a--) {
        for (let b = 0; b < gridWidth; b++) {
          console.log("2");
          grid[a+1][b] = grid[a][b]; // problem
          grid[a][b] = 0;
        }
      }
    } 
  }
}