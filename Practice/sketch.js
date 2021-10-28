// Practice 
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let experiment = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  console.log(question());
}

function question(){
  for (let x = 0; x<10; x++) {
    if (x === 4){
      return x = 5;
    }
  }
}
function mousePressed(){
  question();
}