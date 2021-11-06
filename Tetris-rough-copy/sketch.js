// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Bugs: overlap of blocks
//      positionY = -1
//      clear() does not clear all
//      score and time

let number = 0;
let grid;
let newGrid;
let gridHeight = 22;
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

let manualDown = false;
let nextMoveDown = true;

let a = 0;
let b = 1;
let rotateWidth;
let rotateHeight;

let canRotate = false;
let previousRotate;

let speed = 20;

let noDropping = false;

let gameStart = false;

let clearSound;
let lineSound;
let fallSound;
let rotateSound;

let score = 0;

let i, o, z, s, j, l, t, background, backgroundGrid;

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
  [2,0,0],
  [2,2,2],
];

let jBlocksTwo = [
  [2,2],
  [2,0],
  [2,0],
];

let jBlocksThree = [
  [2,2,2],
  [0,0,2],
];

let jBlocksFour = [
  [0,2],
  [0,2],
  [2,2],
];
              
let lBlocks = [
  [0,0,3],
  [3,3,3],
];

let lBlocksTwo = [
  [3,0],
  [3,0],
  [3,3],
];

let lBlocksThree = [
  [3,3,3],
  [3,0,0],
];

let lBlocksFour = [
  [3,3],
  [0,3],
  [0,3],
];

let oBlocks = [
  [4,4],
  [4,4],
];

let tBlocks = [
  [0,5,0],
  [5,5,5],
];

let tBlocksTwo = [
  [5,0],
  [5,5],
  [5,0],
];

let tBlocksThree = [
  [5,5,5],
  [0,5,0],
];

let tBlocksFour = [
  [0,5],
  [5,5],
  [0,5],
];

let sBlocks = [
  [0,6,6],
  [6,6,0],
];

let sBlocksTwo = [
  [6,0],
  [6,6],
  [0,6],
];

let zBlocks = [
  [7,7,0],
  [0,7,7],
];

let zBlocksTwo = [
  [0,7],
  [7,7],
  [7,0],
];

let blockSetOne = [iBlocks, jBlocks, lBlocks, oBlocks, tBlocks, sBlocks, zBlocks, tBlocksThree, jBlocksThree, lBlocksThree];
let blockSetTwo = [iBlocksTwo, sBlocksTwo, zBlocksTwo, tBlocksTwo, tBlocksFour, jBlocksTwo, jBlocksFour, lBlocksTwo, lBlocksFour];

let iBlockSet = [iBlocks, iBlocksTwo];
let lBlockSet = [lBlocks, lBlocksTwo, lBlocksThree, lBlocksFour];
let tBlockSet = [tBlocks, tBlocksTwo, tBlocksThree, tBlocksFour];
let sBlockSet = [sBlocks, sBlocksTwo];
let zBlockSet = [zBlocks, zBlocksTwo]; 

function preload() {
  soundFormats('ogg');
  clearSound = loadSound('assets/clear.mp3');
  fallSound = loadSound('assets/fall.mp3');
  rotateSound = loadSound('assets/selection.mp3');
  lineSound = loadSound('assets/line.mp3');

  i = loadImage('assets/iblocks.png');
  s = loadImage('assets/sblocks.png');
  z = loadImage('assets/zblocks.png');
  j = loadImage('assets/jblocks.png');
  l = loadImage('assets/lblocks.png');
  o = loadImage('assets/oblocks.png');
  t = loadImage('assets/tblocks.png');

  background = loadImage('assets/background.jpg');
  backgroundGrid = loadImage('assets/backgroundGrid.jpg');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  grid = create2DArray();
  gridSide = height/gridHeight;
  newGrid = create2DArray();
  blockList = [];
}



function draw() {
  image(background, 0, 0, width, height, );
  data();
  displayGrid();
  
  if (gameStart === true) {
    moveDown();
    moveBlock();
    //console.log(noDropping);
  }
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
        image(backgroundGrid, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
      }

      else if (grid[y][x] === 1) {
        image(i, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
      }

      else if (grid[y][x] === 2) {
        image(j, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
      }

      else if (grid[y][x] === 3) {
        image(l, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
      }
      
      else if (grid[y][x] === 4) {
        image(o, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
      }

      else if (grid[y][x] === 5) {
        image(t, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
      }

      else if (grid[y][x] === 6) {
        image(s, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
      }

      else if (grid[y][x] === 7) {
        image(z, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
      }

      // rect(x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide);
    }
  }
}

function findRotateData() {
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

function generateBlock() {
  blockList.push(random(blockSetOne));
  blockListZ += 1;

  positionY = 0;
  positionX = round(random(0, gridWidth-blockList[blockListZ][0].length));

  start = true;
  noDropping = false;
  findRotateData();
}

function moveDown() {
  if (start === true) {//after block have been spawned    
    
    if (frameCount % 5 === 0) {      
      for (let y = blockList[blockListZ].length-1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {
          if (grid[y+positionY][x+positionX] > 0 && blockList[blockListZ][y][x] > 0) {
            grid[y+positionY][x+positionX] = 0; // possible bug      
          }
        }
      }
    
      if (left === true) {
        if (frameCount % (speed/4) === 0 ) { //unfinished && grid[positionY+1][positionX+blockList[blockListZ][blockListY].length] > 0
          positionX -= 1;
        }
      }          
      else if (right === true) {
        if (frameCount % (speed/4) === 0 ) { //unfinished && grid[positionY+1][positionX-1] > 0
          positionX += 1;
        }
      }



   
      if (manualDown === true) {
        dropDown();
      }

      if (canRotate && frameCount % 10 === 0 && positionY >= rotateHeight) {
        rotateBlock();        
        positionY += rotateHeight;
        positionX += rotateWidth; 
        
        for (let y = blockList[blockListZ].length -1; y >= 0; y--) { //check if block can rotate, problem
          for (let x = 0; x < blockList[blockListZ][y].length; x++) {
            if (grid[y+positionY][x+positionX] !== 0 && blockList[blockListZ][y][x] !== 0){
              positionY -= rotateHeight, positionX -= rotateWidth;
              blockList[blockListZ] = previousRotate;
            }
          }
        }
        rotateSound.play();
        canRotate = false; 
      }
      noDrop();
      if (frameCount % speed === 0 && positionY <= 21-blockList[blockListZ].length && noDropping === false) {
        positionY += 1;
      }

      for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {    
          if (blockList[blockListZ][y][x] > 0){
            grid[y+positionY][x+positionX] = blockList[blockListZ][y][x];
          } 

          if (y+positionY + 1 < gridHeight ) {// stoping the block && positionY > 1         
            if (blockList[blockListZ][y][x] > 0 && (y === blockList[blockListZ].length-1 || blockList[blockListZ][y+1][x] === 0)) {
              if (grid[y+positionY+1][x+positionX] > 0) { 
                start = false;
              }
            }
          }
        }
      }        
      if (start === false) {
        fallSound.play();
        clearBlock();
      }        
      left = false;
      right = false;
      nextMove = true;
      nextMoveDown = true;
    }
  }

  // if (start === true) {//after block have been spawned    
    
  //   if (frameCount % 5 === 0) {      
  //     if (right === true) {
  //       if (frameCount % speed === 0 && grid[positionY+1][positionX+blockList[blockListZ][blockListY].length] > 0) { //unfinished 
  //         positionX -= 1;
  //       }
  //       else {
  //         a = -1;
  //       }
  //     }          
  //     else if (left === true) {
  //       if (frameCount % speed === 0 && grid[positionY+1][positionX-1] > 0) { //unfinished 
  //         positionX += 1;
  //       }
  //       else {
  //         a = 1; 
  //       }
  //     }
  //     else {
  //       a = 0;
  //     }

  //     //noDrop();
  //     if (frameCount % speed === 0 && positionY <= 21-blockList[blockListZ].length && noDropping === false) {
  //       positionY += 1;
  //       b = 1;
  //     }

  //     else {
  //       b = 0;
  //     }
  //     for (let y = blockList[blockListZ].length-1; y >= 0; y--) {
  //       for (let x = 0; x < blockList[blockListZ][y].length; x++) {
  //         if (grid[y+positionY-b][x+positionX+a] > 0 && blockList[blockListZ][y][x] > 0) {
  //           grid[y+positionY-b][x+positionX+a] = 0; // possible bug
  //         }

  //       }
  //     }      
  //     if (manualDown === true) {
  //       dropDown();
  //     }

  //     if (canRotate && frameCount % 10 === 0 && positionY >= rotateHeight) {
  //       rotateBlock();        
  //       //positionY += rotateHeight;
  //       positionX += rotateWidth; 
        
  //       for (let y = blockList[blockListZ].length -1; y >= 0; y--) { //check if block can rotate, problem
  //         for (let x = 0; x < blockList[blockListZ][y].length; x++) {
  //           if (grid[y+positionY][x+positionX] !== 0 && blockList[blockListZ][y][x] !== 0){
  //             positionY -= rotateHeight, positionX -= rotateWidth;
  //             blockList[blockListZ] = previousRotate;
  //           }
  //         }
  //       }
  //       rotateSound.play();
  //       canRotate = false; 
  //     }
  //     //where rotate has to happen
  //     for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
  //       for (let x = 0; x < blockList[blockListZ][y].length; x++) {    
  //         if (blockList[blockListZ][y][x] > 0){
  //           grid[y+positionY][x+positionX] = blockList[blockListZ][y][x];
  //         } 

  //         if (y+positionY + 1 < gridHeight ) {// stoping the block && positionY > 1         
  //           if (blockList[blockListZ][y][x] > 0 && (y === blockList[blockListZ].length-1 || blockList[blockListZ][y+1][x] === 0)) {
  //             if (grid[y+positionY+1][x+positionX] > 0) { 
  //               start = false;
  //             }
  //           }
  //         }
  //       }
  //     }        
  //     if (start === false) {
  //       clearBlock();
  //     }        
  //     left = false;
  //     right = false;
  //     nextMove = true;
  //     nextMoveDown = true;
  //   }
  // }

  if (start === true) {//stop the block when touching bottom
    for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
      for (let x = 0; x < blockList[blockListZ][y].length; x++) {              
        if (positionY + blockList[blockListZ].length === gridHeight) {
          start = false; 
          fallSound.play();
          clearBlock();
        }  
      }
    }
  }
  if (start === false) {
    generateBlock();
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
  findRotateData();
}

function mousePressed() {
  gameStart = !gameStart;
}

function moveBlock() { //
  if (keyIsDown(65) && start === true && nextMove === true && frameCount % speed !== 0 && grid[positionY][positionX-1] === 0 && grid[positionY+1][positionX-1] === 0) {
    nextMove = false;
    //positionX -= 1;
    left = true;
  }
  else if (keyIsDown(68) && start === true && nextMove === true && frameCount % speed !== 0 && grid[positionY][positionX+blockList[blockListZ][blockListY].length] === 0 && grid[positionY+1][positionX+blockList[blockListZ][blockListY].length] === 0) {
    nextMove = false;
    //positionX += 1;
    right = true;
  }
  if (keyIsDown(83) && start === true) {
    manualDown = true;
  }
  else {
    manualDown = false;
  }
}

function keyPressed() {
  if (keyCode === 87) {
    canRotate = true;
  }
}

function clearBlock(){
  for (let y = gridHeight -1; y >= 0; y--) {
    let spaces = 0;
    for (let x = 0; x < gridWidth; x++) {
      if (grid[y][x] === 0) {
        spaces += 1;
      }
    }
    if (spaces === 0) {
      for (let x = 0; x < gridWidth; x++) {
        grid[y][x] = 0;
      }
      for (let a = y-1; a >= 0 ; a--) {
        for (let b = 0; b < gridWidth; b++) {
          grid[a+1][b] = grid[a][b];
          grid[a][b] = 0;
        }
      }
      clearSound.play();
      score += 100;
    } 
  }
  for (let y = 0; y < 2; y++){
    for (let x = 0; x < gridWidth; x++){
      if (grid[y][x] > 0) {
        gameStart = false;
      }
    }
  }
}

function dropDown() {
  if (nextMoveDown === true && positionY < 21-blockList[blockListZ].length) { //Problem
    noDrop();              
    if (noDropping === false) {
      nextMoveDown = false;
      positionY += 1;
    }
  }
}

function noDrop() {
  for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
    for (let x = 0; x < blockList[blockListZ][y].length; x++) {    
      if (y+positionY + 1 < gridHeight -1) {     
        if (blockList[blockListZ][y][x] > 0 && (y === blockList[blockListZ].length-1 || blockList[blockListZ][y+1][x] === 0)) {
          if (grid[y+positionY+1][x+positionX] !== 0) { 
            return noDropping = true;
          }
        }
      }
    }
  }
}

function data() {
  textSize(60);
  stroke(0);
  fill(0);

  textAlign(CENTER);
  text("Score: " + score, 400, 200);
} 