// Grid Based Game - Tetris
// Aaron Su
// November 6, 2021

//background grid variables
let grid;
let gridHeight = 22;
let gridWidth = 10;
let gridSide;

//block list variables
let blockList;
let blockListZ = -1;
let blockListY = 0;

//block variables
let positionY = 0;
let positionX;

//block movement variables
let left = false;
let right = false;
let nextMove = true;
let manualDown = false;
let nextMoveDown = true;
let rotateWidth;
let rotateHeight;
let canRotate = false;
let previousRotate;
let speed = 20;
let noDropping = false;
let noLeft = false;
let noRight = false;

//game over and pause variables
let start = false;
let gameStart = false;
let gameover = false;

//sound initialization 
let clearSound;
let fallSound;
let rotateSound;

//game data variables
let score = 0;
let time = 0;
let previousTime = 0;

//visual initialization
let i, o, z, s, j, l, t, backgroundGrid;

//block lists 
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

//list of horizontal shaped blocks
let blockSetOne = [iBlocks, jBlocks, lBlocks, oBlocks, tBlocks, sBlocks, zBlocks, tBlocksThree, jBlocksThree, lBlocksThree];

//list of vertical shaped blocks
let blockSetTwo = [iBlocksTwo, sBlocksTwo, zBlocksTwo, tBlocksTwo, tBlocksFour, jBlocksTwo, jBlocksFour, lBlocksTwo, lBlocksFour];

//list of block shapes 
let iBlockSet = [iBlocks, iBlocksTwo]; //i shaped blocks
let lBlockSet = [lBlocks, lBlocksTwo, lBlocksThree, lBlocksFour]; //l shaped blocks
let tBlockSet = [tBlocks, tBlocksTwo, tBlocksThree, tBlocksFour]; //t shaped blocks
let sBlockSet = [sBlocks, sBlocksTwo]; //s shaped blocks
let zBlockSet = [zBlocks, zBlocksTwo]; //z shaped blocks

//preloading sound and images
function preload() {
  //sound
  soundFormats('ogg');
  clearSound = loadSound('assets/clear.mp3');
  fallSound = loadSound('assets/fall.mp3');
  rotateSound = loadSound('assets/selection.mp3');

  //images
  i = loadImage('assets/iblocks.png');
  s = loadImage('assets/sblocks.png');
  z = loadImage('assets/zblocks.png');
  j = loadImage('assets/jblocks.png');
  l = loadImage('assets/lblocks.png');
  o = loadImage('assets/oblocks.png');
  t = loadImage('assets/tblocks.png');
  backgroundGrid = loadImage('assets/backgroundGrid.jpg');
}

//set up
function setup() {
  createCanvas(windowHeight*1.2, windowHeight);

  grid = create2DArray();
  gridSide = height/gridHeight;
  blockList = [];
}

function draw() {
  //display background and data
  background(137, 207, 240);
  displayGrid();
  data();

  //when game started
  if (gameStart === true) {
    time = round(millis()/1000) - previousTime;
    moveDown();
    moveBlock();
  }
}

//creates 2 dimensional array
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

//displays images of blocks
function displayGrid() {
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (grid[y][x] === 0) {
        image(backgroundGrid, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide); //displays background blocks
      }

      else if (grid[y][x] === 1) {
        image(i, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide); //displays i shaped blocks
      }

      else if (grid[y][x] === 2) {
        image(j, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide); //displays j shaped blocks
      }

      else if (grid[y][x] === 3) {
        image(l, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide); //displays l shaped blocks
      }
      
      else if (grid[y][x] === 4) {
        image(o, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide); //displays o shaped blocks
      }

      else if (grid[y][x] === 5) {
        image(t, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide); //displays t shaped blocks
      }

      else if (grid[y][x] === 6) {
        image(s, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide); //displays s shaped blocks
      }

      else if (grid[y][x] === 7) {
        image(z, x * gridSide + (width/2 - gridWidth/2 * gridSide), y * gridSide, gridSide, gridSide); //displays z shaped blocks
      }
    }
  }
}

//sanity check before rotating
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

//spawns blocks 
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
  //after block have been spawned  
  if (start === true) {  

    //movement of blocks
    if (frameCount % 5 === 0) {      
      //erases the block
      for (let y = blockList[blockListZ].length-1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {
          if (grid[y+positionY][x+positionX] > 0 && blockList[blockListZ][y][x] > 0) {
            grid[y+positionY][x+positionX] = 0;  
          }
        }
      }
    
    //changes position of block
      //moving block left
      if (left === true) {
        if (frameCount % (speed/4) === 0) {
          sideCheck("left");
          if (noLeft === false){
            positionX -= 1;
          }
        }
      }          

      //moving block right
      else if (right === true) {
        if (frameCount % (speed/4) === 0) { 
          sideCheck("right");
          if (noRight === false) {
            positionX += 1;
          }
        }
      }

      //sanity checks when moving down
      if (manualDown === true) {
        dropDown();
      }

      //rotate block
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

      //sanity check when moving down
      noDrop();
      
      //moving down
      if (frameCount % speed === 0 && positionY <= 21-blockList[blockListZ].length && noDropping === false) {
        positionY += 1;
      }

      //draws the block
      for (let y = blockList[blockListZ].length -1; y >= 0; y--) {
        for (let x = 0; x < blockList[blockListZ][y].length; x++) {    
          if (blockList[blockListZ][y][x] > 0){
            grid[y+positionY][x+positionX] = blockList[blockListZ][y][x];
          } 
          
          //stops the block from moving when landing on another block
          if (y+positionY + 1 < gridHeight ) { 
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
      //resets restrictive variables       
      left = false;
      right = false;
      nextMove = true;
      nextMoveDown = true;
    }
  }

  //stops the block when touching bottom
  if (start === true) {
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
  //spawns new block
  if (start === false) {
    generateBlock();
  }
}

//block rotation variables
function rotateBlock() {
  //zblocks rotation
  if (blockList[blockListZ] === zBlocks && canRotate) { 
    blockList[blockListZ] = zBlocksTwo;
    previousRotate = zBlocks;
  }
  else if (blockList[blockListZ] === zBlocksTwo && canRotate) {
    blockList[blockListZ] = zBlocks;
    previousRotate = zBlocksTwo;
  }

  //sblocks rotation
  else if (blockList[blockListZ] === sBlocks && canRotate) { 
    blockList[blockListZ] = sBlocksTwo;
    previousRotate = sBlocks;
  }
  else if (blockList[blockListZ] === sBlocksTwo && canRotate) {
    blockList[blockListZ] = sBlocks;
    previousRotate = sBlocksTwo;
  }

  //iblocks rotation
  else if (blockList[blockListZ] === iBlocks && canRotate) {
    blockList[blockListZ] = iBlocksTwo;
    previousRotate = iBlocks;
  }
  else if (blockList[blockListZ] === iBlocksTwo && canRotate) {
    blockList[blockListZ] = iBlocks;
    previousRotate = iBlocksTwo;
  }    

  //tblocks rotation
  else if (blockList[blockListZ] === tBlocks && canRotate) { 
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

  //jblocks rotation
  else if (blockList[blockListZ] === jBlocks && canRotate) { 
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

  //lblocks rotation
  else if (blockList[blockListZ] === lBlocks && canRotate) { 
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

//when mouse is clicked
function mousePressed() {
  //pause game
  gameStart = !gameStart;

  //restart game 
  if (gameover) {
    //reset variables 
    blockList = [];
    blockListZ = -1;
    score = 0;
    grid = create2DArray();
    gameover = false;
    gameStart = true;
    previousTime = round(millis()/1000);
    generateBlock();
  }
}

//when keyboard is pressed
function moveBlock() {
  //when "Left Arrow" or "a" is pressed 
  if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && start === true && nextMove === true && frameCount % speed !== 0 ) {
    nextMove = false;
    left = true;
  }

  //when "Right Arrow" or "d" is pressed 
  else if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && start === true && nextMove === true && frameCount % speed !== 0 ) {
    nextMove = false;
    right = true;
  }

  //when "Down Arrow" or "s" is pressed 
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW) && start === true) {
    manualDown = true;
  }
  else {
    manualDown = false;
  }
}

//when "Up Arrow" or "w" is pressed 
function keyPressed() {
  if (keyCode === 87 || keyCode === UP_ARROW) {
    canRotate = true;
  }
}

//check if there are full rows to clear
function clearBlock(){
  for (let y = gridHeight -1; y >= 0; y--) {
    let spaces = 0;
    for (let x = 0; x < gridWidth; x++) {
      if (grid[y][x] === 0) {
        spaces += 1;
      }
    }
    //erase row
    if (spaces === 0) {
      for (let x = 0; x < gridWidth; x++) {
        grid[y][x] = 0;
      }
      //bring everything above down
      for (let a = y-1; a >= 0 ; a--) {
        for (let b = 0; b < gridWidth; b++) {
          grid[a+1][b] = grid[a][b];
          grid[a][b] = 0;
        }
      }
      y += 1;
      clearSound.play();
      score += 100;
    } 
  }
  
  //if blocks top the screen
  for (let y = 0; y < 2; y++){
    for (let x = 0; x < gridWidth; x++){
      if (grid[y][x] > 0) {
        //game over
        gameStart = false;
        gameover = true;
      }
    }
  }
}

//move block down manually
function dropDown() {
  if (nextMoveDown === true && positionY < 21-blockList[blockListZ].length) { //Problem
    noDrop();              
    if (noDropping === false) {
      nextMoveDown = false;
      positionY += 1;
    }
  }
}

//sanity check when moving block down
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

//sanity check when moving block horizontally 
function sideCheck(direction) {
  if (direction === "left") {
    for (let y = 0; y < blockList[blockListZ].length; y++) {
      for (let x = 0; x < blockList[blockListZ][y].length; x++) {
        if (x === 0 || blockList[blockListZ][y][x-1] === 0) {
          if (grid[y+positionY][x+positionX-1] !== 0) {
            return noLeft = true; 
          }
        }
      }
    }
    return noLeft = false;
  }

  if (direction === "right") {
    for (let y = 0; y < blockList[blockListZ].length; y++) {
      for (let x = 0; x < blockList[blockListZ][y].length; x++) {
        if (x === blockList[blockListZ][y].length-1 || blockList[blockListZ][y][x+1] === 0) {
          if (grid[y+positionY][x+positionX+1] !== 0) {
            return noRight = true; 
          }
        }
      }
    }
  }
  return noRight = false;
}

//data text
function data() {
  //score text 
  textSize(windowHeight*(50/969));
  stroke(255);
  fill(255);

  textAlign(CENTER);
  text("Score: " + score, width/8, height/8);

  //time text
  textSize(windowHeight*(50/969));
  stroke(255);
  fill(255);

  textAlign(CENTER);
  text("Time: " + time, width/8, height/5.5);

  //gameover text
  if (gameover) {
    textSize(windowHeight*(60/969));
    stroke(255);
    fill(255);

    textAlign(CENTER);
    text("Game Over", width/2, height/2);
  } 
} 