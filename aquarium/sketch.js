// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let theCreatures = [];
let fish;
let octopus;
let clownFishImg;
let octopusImg;

function preload() {
  clownFishImg = loadImage("assets/fish.jpg");
  octopusImg = loadImage("assets/octopus.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 50; i++){
    if (random(100) < 30) {
      let octopus = new Octopus(100, 200, 100, octopusImg);
      theCreatures.push(octopus);
    }
    else {
      let fish = new Clownfish(random(width), random(height), 30, clownFishImg);
      theCreatures.push(fish);
    }
  }

}

function draw() {
  background(220);
  for (let someCreature of theCreatures) {
    someCreature.update();
    someCreature.display();
  }
  // fish.update();
  // fish.display();
  // octopus.update();
  // octopus.display();
  
}

class Creature {
  constructor(x , y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.yTime = 1000;
  }

  update() {
    this.x += 2;
    this.y = noise(this.yTime)*height;
    this.yTime += random(0.001, 0.005);

    if (this.x > width) {
      this.x = 0;
    }
  }

  display() {
    fill("green");
    circle(this.x, this.y, this.size);
  }
}

class Clownfish extends Creature {
  constructor(x, y, size, theImage) {
    super(x, y, size);
    this.myImage = theImage;
  }

  display() {
    image(this.myImage, this.x, this.y, this.size, this.size);
  }
}

class Octopus extends Creature {
  constructor(x, y, size, someImage) {
    super(x, y, size);
    this.image = someImage;
  }

  display() {
    image(this.image, this.x, this.y, this.size, this.size);
  }
}