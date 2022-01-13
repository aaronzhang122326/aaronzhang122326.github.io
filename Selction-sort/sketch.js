// First Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let someList = [5,15,3,8,9,1,20,7];

function selectionSort(aList) {
  let highest = 0;
  //let swope = 0;
  for (let a = aList.length-1; a >= 0; a--){
    for (let i = 0; i < a+1; i++){
      if (aList[i] > aList[highest]) {
        highest = i;
      }
    }
    let temp = aList[a];
    aList[a] = aList[highest];
    aList[highest] = temp;
  }
  return aList;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(selectionSort(someList));
}

function draw() {
}
