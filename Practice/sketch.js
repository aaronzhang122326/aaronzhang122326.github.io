
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  
}
function mousePressed(){
  //console.log(round(random(0, 20)) + " - " + "(-" + round(random(0, 20)) + ") =");
  // if ((round(random(1,2)) === 1)){
  //   console.log("-"  + round(random(0, 10)) + " + " + round(random(10, 20)) + " =");
  // }
  // else {
  //   console.log(round(random(0, 10)) + " - " + round(random(10, 20)) + " =");
  // }

  if ((round(random(1,8)) === 1)){
    console.log("-"  + round(random(10, 20)) + " + " + round(random(0, 10)) + " =");
  }
  else if ((round(random(1,8)) === 2)){
    console.log(round(random(10, 20)) + " + " + "(-" + round(random(0, 10)) + ") =");
  }
  else if ((round(random(1,8)) === 3)){
    console.log("-" + round(random(10, 20)) + " + " + "(-" + round(random(0, 10)) + ") =");
  }
  else if ((round(random(1,8)) === 4)){
    console.log("-" + round(random(10, 20)) + " - " + "(-" + round(random(0, 10)) + ") =");
  }
  else if ((round(random(1,8)) === 5)){
    console.log("-" + round(random(10, 20)) + " - " + round(random(0, 10)) + " =");
  }
  else if ((round(random(1,8)) === 6)){
    console.log(round(random(10, 20)) + " - " + "(-" + round(random(0, 10)) + ") =");
  }
  else if ((round(random(1,8)) === 5)){
    console.log("-" + round(random(10, 20)) + " - " + round(random(0, 10)) + " =");
  }
  else if ((round(random(1,8)) === 6)){
    console.log(round(random(10, 20)) + " - " + "(-" + round(random(0, 10)) + ") =");
  }
  else if ((round(random(1,8)) === 7)){
    console.log("-" + round(random(0, 10)) + " + " + round(random(10, 20)) + " =");
  }
  else if ((round(random(1,8)) === 8)){
    console.log(round(random(0, 10)) + " - " + round(random(0, 20)) +  " =");
  }

}
  