let count = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  sir(width/3, 2*height/3, 2*width/3, 2*height/3, width/2, height/3, count);
}

function sir(point1x, point1y, point2x, point2y, point3x, point3y, degree) {
  //fill("red");
  triangle(point1x, point1y, point2x, point2y, point3x, point3y);
  

  if (degree > 0) {
    //triangle(point1x, point1y, point2x, point2y, point3x, point3y)
    sir(point1x, point1y, (point2x+point1x)/2, point1y, (point3x+point1x)/2, (point3y+point1y)/2, degree-1);
    sir(point2x, point2y, (point2x+point1x)/2, point1y, (point2x+point3x)/2, (point2y+point3y)/2, degree-1);
    sir((point3x+point1x)/2, (point3y+point1y)/2, (point2x+point3x)/2, (point2y+point3y)/2, point3x, point3y, degree-1);

  }
}