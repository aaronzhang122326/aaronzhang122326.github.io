// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let width = 400;
let height = 600;

let x = 0;
let y = 500;
let shipWidth = 80;
let shipHeight = 80;
let shipHit = 0;

let bulletOneX;
let bulletOneY;
let shootOne = false;

let leftOpen = false;
let rightOpen = true;

let enemyX;
let enemyY = 0;
let enemyWidth = 50;
let enemyHeight = 50;
let enemyDirection = 1;
let enemyHit = 0;
let enemyBulletOneX;
let enemyBulletOneY;
let enemyBulletSpeed = 5;
let enemyBulletWidth = 10;
let enemyBulletHeight = 20;
    
let enemyShootOne = false;



let ship, bgOne, bgTwo, bgThree, bullet;

let bgOneX = 0;
let bgOneY = 0;
let bgTwoX = 0;
let bgTwoY = -600;

function preload() {
  ship = loadImage('assets/spaceship.png');
  bgOne = loadImage('assets/background.png');
  bgTwo = loadImage('assets/background.png');
  // bgThree = loadImage('background.png')
  enemy = loadImage('assets/enemy.png');
  bullet = loadImage("assets/bullet.png")
}

function setup() {
  createCanvas(width, height);
}


  

  
function draw() {
  if (shipHit <= 2) {
    backGround();
    drawObject();
    move();
    drawBullets();
    drawEnemyBullets();
    shooting();
    enemyBullet();
    enemies();
  }
  
  else {
    
  }
}
  
  

 function drawObject(){
  image(ship, x, y, shipWidth, shipHeight);
}

function move() {
  if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW) && rightOpen) {
    x += 5;
  } 
  else if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && leftOpen) {
    x -= 5;
  }
  
  if (x + 5 >= width) {
    rightOpen = false;
  }
  
  else if (x + 5 <= width) {
    rightOpen = true;
  }
  
  if (x - 5 <= 0) {
    leftOpen = false;
  }
  
  else if (x - 5 >= 0) {
    leftOpen = true;
  }
  
}

function drawBullets() {
  if (keyIsDown(UP_ARROW) && shootOne === false) {
    bulletOneX = x+shipWidth/2;
    bulletOneY = y;
    
    fill(0,255,0);
    rect(bulletOneX, bulletOneY, 10, 5);
    shootOne = true;
    
  }
}

function shooting() {
  if (shootOne === true) {
    bulletOneY -= 15;
    fill(0,255,0);
    rect(bulletOneX, bulletOneY, 10, 15);
  }
    
  if (bulletOneY <= 0) {
    shootOne = false;
  } 
  
  if (bulletOneY <= enemyY + 50 && bulletOneY - 15 >= enemyY && bulletOneX + 10 >= enemyX && bulletOneX <= enemyX + 50) {
    shootOne = false;
    enemyHit += 1;
    bulletOneY = 0;
  }
}

function enemies() {
  enemyX += 6 * enemyDirection;
  
  // if (enemyBulletSpeed >= 3) {
  if (enemyX + enemyWidth >= width) {
    enemyDirection = -1;
  }

  else if (enemyX <= 0) {
    enemyDirection = 1;
  }

//}
  
  if (enemyHit >= 4) {
    enemyHit = 0;
    enemyBulletSpeed += 2;
    enemyBulletWidth = enemyBulletWidth * 1.5;
    enemyBulletHeight = enemyBulletHeight * 1.5;
  }
  
  if (enemyHit === 0) {
    enemyX = random(25, 375);
    enemyHit += 1;
  }
  
  if (enemyHit >= 1 && enemyHit <= 3) {
    image(enemy, enemyX, enemyY, enemyWidth, enemyHeight);
  }
  
  if (enemyY + 3 <= 70) {
    enemyY += 3;
  }
  //enemyX += 3 * enemyDirection;
  
  // if (enemyX + 3 >= width) {
  //   enemyDirection = -1;
  // }
  // else if ()
}

function backGround() {
  image(bgOne, bgOneX, bgOneY, width, height);
  image(bgTwo, bgTwoX, bgTwoY, width, height);
  
  bgOneY += 3;
  bgTwoY += 3;
  
  if (bgOneY >= 600) {
    bgOneY = -600;
  }
  
  if (bgTwoY >= 600) {
    bgTwoY = -600;
  }
}

function drawEnemyBullets() {
  if (enemyShootOne === false) {
    enemyBulletOneX = enemyX+enemyWidth/2;
    enemyBulletOneY = enemyY;
    
    fill(255,0,0);
    rect(enemyBulletOneX, enemyBulletOneY, enemyBulletWidth, enemyBulletHeight);
    enemyShootOne = true;
  }
}

function enemyBullet() {
  if (enemyShootOne === true) {
    enemyBulletOneY += enemyBulletSpeed;
    fill(255,0,0);
    rect(enemyBulletOneX, enemyBulletOneY, enemyBulletWidth, enemyBulletHeight);
  }
    
  if (enemyBulletOneY >= 600) {
    enemyShootOne = false;
  } 
  
  if (enemyBulletOneY <= y + 50 && enemyBulletOneY + enemyBulletHeight >= y + 20 &&       enemyBulletOneX + enemyBulletWidth >= x && enemyBulletOneX <= x + 80) {
    shootOne = false;
    shipHit += 1;
    enemyBulletOneY = enemyY + enemyHeight;
    enemyBulletOneX = enemyX + enemyWidth /2;
    
  }
}

