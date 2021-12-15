// OPP Inheritance Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let car; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new Vehicle("Civic", "car");
}

class Vehicle {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }
}