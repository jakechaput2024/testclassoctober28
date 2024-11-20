let mx, my;
let lines = [];
let lineEndingX, lineEndingY;
let allConnected = false; //when lines connect dots, this'll become true
let currentdotIndex = 0;
let state = 0;
let stage = 0;
let img;
let gradient;
let text1, text2;
let song;
let allCoordinates = [];

function preload() {
  img = loadImage('/assets/Placeholder.png');
  gradient = loadImage('/assets/gradient.png');
  text1 = loadImage('/assets/text1.gif');
  text2 = loadImage('/assets/text2.gif');
  song = loadSound('/assets/music.mp3');
}

function setup() {
  song.play();
  console.log

  allCoordinates = [
    [createVector(322, 65), createVector(128, 317), createVector(365, 534), createVector(800, 634), createVector(1076, 502), createVector(1186, 357), createVector(1136, 283), createVector(973, 86)],
    [createVector(258, 179), createVector(409, 385), createVector(1011, 191), createVector(1238, 306), createVector(1217, 452)]
  ]

  createCanvas(1399, 703);
}

function draw() {
  image(gradient, 0, 0);

  switch (state) {
    case 0:
      background("black");
      //image(text1, 400, 500); commented out for testing
      if (millis() > 0) { //4900 
        state = 1;
      }
      break;

    case 1:
      background("black");
      //image(text2, 400, 500); commented out for testing
      if (millis() > 0) { //9900
        state = 2;
      }
      break;

    case 2:
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);

      // old lines
      stroke(199, 249, 255); //need this stroke so the older lines show
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        l.draw();
      }

      noStroke(); //no stroke color for the circles

      lineEndingX = mouseX;
      lineEndingY = mouseY;

      // the coordinates
      for (let i = 0; i < allCoordinates[stage].length; i++) { //(let i = 0; i < dots.length; i++) {
        const xy = allCoordinates[stage][i]; //dot = dots[i]
        circle(xy.x, xy.y, 20); //dot.draw();
        if (dist(mouseX, mouseY, xy.x, xy.y) < 7) {
          lineEndingX = xy.x;
          lineEndingY = xy.y;
        }
      }

      // current line
      stroke(199, 249, 255);
      line(mx, my, lineEndingX, lineEndingY);

      if (allConnected) {
        // fill("green");
        // textSize(32);
        // textAlign(CENTER, CENTER);
        // text("You Won!", width / 2, height / 2);
        image(img, 0, 0);
        if (millis() > 30000) { //4900 (work on setting the millis > number)
          state = 3;
          stage = (stage + 1) % allCoordinates.length;
          console.log(stage);

          lines = [];
          allConnected = false;
          currentdotIndex = 0;
          mx = undefined;
          my = undefined;
        }
      }
      break;

    case 3:

    fill(245, 175, 78);
    stroke(199, 249, 255); //need this stroke so the older lines show
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        l.draw();
      }

    noStroke();

    lineEndingX = mouseX;
    lineEndingY = mouseY;

    for (let i = 0; i < allCoordinates[stage].length; i++) {
      const xy = allCoordinates[stage][i];
      circle(xy.x, xy.y, 20); 
      if (dist(mouseX, mouseY, xy.x, xy.y) < 7) {
        lineEndingX = xy.x;
        lineEndingY = xy.y;
      }     
    }

    stroke(199, 249, 255);
    line(mx, my, lineEndingX, lineEndingY);

    if (allConnected) {
      // fill("green");
      // textSize(32);
      // textAlign(CENTER, CENTER);
      // text("You Won!", width / 2, height / 2);
      image(img, 0, 0);
      if (millis() > 30000) { //4900 (work on setting the millis > number)
        state = 3;
        stage = (stage + 1) % allCoordinates.length;
        console.log(stage);

        lines = [];
        allConnected = false;
        currentdotIndex = 0;
        mx = undefined;
        my = undefined;
      }
    }
    break;

  }
}

function mouseClicked() {
  for (let i = 0; i < allCoordinates[stage].length; i++) {
    const xy = allCoordinates[stage][i];
    if (dist(mouseX, mouseY, xy.x, xy.y) < 7) {
      if (i === currentdotIndex) { 
        currentdotIndex++;
      let line = new Line(mx, my, xy.x, xy.y);
      lines.push(line);
      mx = xy.x;
      my = xy.y;

      if (lines.length === allCoordinates[stage].length) {
        allConnected = true;
      }
    } else {}
      break;
    }
  }
}