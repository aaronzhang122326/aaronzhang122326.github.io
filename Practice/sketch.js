// Practice 
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let experiment = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  console.log(experiment);
}

function question(){
  for (let x = 0; x<10; x++) {
    return experiment += 1;
  }
}
function mousePressed(){
  question();
}