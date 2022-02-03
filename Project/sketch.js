// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid = [];
let cellSize = 100;
let slidingDown = false;
let slidingUp = false;
let slidingLeft = false;
let slidingRight = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  create2DArray(4, 4);
}

function draw() {
  background(220);
  display2DArray(grid, cellSize);
}

function keyPressed(){
  slidingDown = false;
  slidingUp = false;
  slidingLeft = false;
  slidingRight = false;
  if (keyIsPressed){
    if (keyCode === 87){
      slidingUp = true;
      collideUp();
    }
    else if (keyCode === 83){
      slidingDown = true;
    }
    else if (keyCode === 65){
      slidingLeft = true;
    }
    else if (keyCode === 68){
      slidingRight = true;
    }
    spawnBlock();
  }
}
function create2DArray(row, col){
  for (let y = 0; y < col; y++){
    grid.push([]);
    for (let x = 0; x < row; x++){
      grid[y].push(0);
    }
  }
}

function display2DArray(){
  for (let y = 0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      if (grid[y][x] === 0) {
        fill("black");
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] !== 0) {
        fill("red");
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
        fill("black");
        textSize(50);
        textAlign(CENTER);
        text(grid[y][x], x*cellSize+cellSize/2, y*cellSize+cellSize/2);
      }
    }
  }
}

function spawnBlock(){
  let yList = [];
  let xList = [];
  for (let y = 0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      if (grid[y][x] === 0){
        if (slidingDown){ //down
          if (y === grid.length-1){
            yList.push(y);
            xList.push(x);
          }
          else if (grid[y+1][x] !== 0){
            yList.push(y);
            xList.push(x);
          }
        }

        if (slidingUp){ //up
          if (y === 0){
            yList.push(y);
            xList.push(x);
          }
          else if (grid[y-1][x] !== 0){
            yList.push(y);
            xList.push(x);
          }
        }

        if (slidingLeft){ //left
          if (x === 0){
            yList.push(y);
            xList.push(x);
          }
          else if (grid[y][x-1] !== 0){
            yList.push(y);
            xList.push(x);
          }
        }

        if (slidingRight){ //right
          if (y === grid[0].length-1){
            yList.push(y);
            xList.push(x);
          }
          else if (grid[y][x+1] !== 0){
            yList.push(y);
            xList.push(x);
          }
        }
      }
    }
  }
  let loc = round(random(0, yList.length-1));
  grid[yList[loc]][xList[loc]] = 2;
  //console.log(loc);
}

function collideUp(){
  for (let y = 1; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      if (grid[y][x] === grid[y-1][x]){
        let temp = grid[y][x];
        grid[y][x] = 0;
        grid[y-1][x] = grid[y-1][x] + temp;
      }
    }
  }
  for (let y = 1; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      moveUp(y, x, y, x);
    }
  }
}

function moveUp(col, row, oriY, oriX){
  if (col > 0){
    if (grid[col-1][row] === 0){
      return moveUp(col-1, row, oriY, oriX);
    }
  }
  else {
    if (col !== oriY){
      return grid[col][row] = grid[oriY][oriX], grid[oriY][oriX] = 0;
    }
    return grid[col][row] = grid[oriY][oriX];
  }
}
