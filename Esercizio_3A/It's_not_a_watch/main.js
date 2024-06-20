let triangleNumbers = [];
let squareNumbers = [];
let circleNumbers = [];
let triangleHeight = 375;
let triangleBase = 375;
let squareSize = 395; // rettangolo deve avere la stessa dimensione come triangolo
let triangleStartX = 670; // posizione del triangolo
let triangleStartY = 50;
let squareStartX = 50; // posizione del rettangolo
let squareStartY = 30; // posizione numeri
let circleCenterX = 1060; // posizione del cerchio a destra del triangolo (teoria del colore Itten, ogni fomra ha suo colore)
let circleCenterY = 230;
let circleRadius = triangleHeight / 2 + 11; // cerchio ha stessi dimensioni del triangolo
let numberSpacing = triangleBase / 11;
let hideNumber = 0;

function setup() {
  createCanvas(1300, 450);
  console.log(windowWidth);
  textAlign(CENTER, CENTER);

  generateTriangleNumbers();
  generateSquareNumbers();
  generateCircleNumbers();
}

function windowResized() {
  if (windowWidth < 1300) {
    resizeCanvas(450, 1300);

  
    triangleStartX = 225;
    triangleStartY = 490;
    squareStartX = 30;
    squareStartY = 50;
    circleCenterX = 220;
    circleCenterY = 1090;
  } else {
    resizeCanvas(1300, 450);

   
    triangleStartX = 670;
    triangleStartY = 50;
    squareStartX = 50;
    squareStartY = 30;
    circleCenterX = 1060;
    circleCenterY = 230;
  }

 
  triangleNumbers = [];
  squareNumbers = [];
  circleNumbers = [];
  generateTriangleNumbers();
  generateSquareNumbers();
  generateCircleNumbers();
}

function generateTriangleNumbers() {
  triangleNumbers = [];
  let elementsInRow = [1, 2, 3, 4, 5, 6, 7, 7, 8, 8, 9];
  for (let row = 0; row < 11; row++) {
    let currentNumberSpacing = numberSpacing;
    if (row >= 7 && row <= 9) {
      currentNumberSpacing *= 1.1;
    }
    if (row === elementsInRow.length - 2) {
      currentNumberSpacing *= 1.1;
    } else if (row === elementsInRow.length - 1) {
      currentNumberSpacing *= 1.2;
    }
    for (let col = 0; col < elementsInRow[row]; col++) {
      if (triangleNumbers.length > 60) break;
      let pos = {
        x:
          triangleStartX -
          ((elementsInRow[row] - 1) * currentNumberSpacing) / 2 +
          col * currentNumberSpacing,
        y: triangleStartY + row * (triangleHeight / 11),
      };
      triangleNumbers.push({ value: triangleNumbers.length, pos: pos });
    }
    if (triangleNumbers.length > 60) break;
  }
}

function generateSquareNumbers() {
  squareNumbers = [];
  let elementsInSquareRow = 6;
  let elementsInSquareColumn = 4;
  for (let row = 0; row < elementsInSquareColumn; row++) {
    for (let col = 0; col < elementsInSquareRow; col++) {
      if (squareNumbers.length > 60) break;
      let pos = {
        x: squareStartX + 30 + col * (squareSize / elementsInSquareRow),
        y: squareStartY + 50 + row * (squareSize / elementsInSquareColumn),
      };
      squareNumbers.push({ value: squareNumbers.length, pos: pos });
    }
    if (squareNumbers.length > 60) break;
  }
}

function generateCircleNumbers() {
  circleNumbers = [];
  let elementsInCircleRow = [3, 7, 9, 11, 11, 9, 7, 3];
  let circleRowHeight = (circleRadius / elementsInCircleRow.length) * 1.9;
  for (let row = 0; row < 8; row++) {
    let currentNumberSpacing = numberSpacing * 1.05;
    if (row === elementsInCircleRow.length - 1) {
      currentNumberSpacing *= 1;
    }
    for (let col = 0; col < elementsInCircleRow[row]; col++) {
      if (circleNumbers.length > 60) break;
      let pos = {
        x:
          circleCenterX -
          ((elementsInCircleRow[row] - 1) * currentNumberSpacing) / 2 +
          col * currentNumberSpacing,
        y: circleCenterY + row * ((circleRadius / 5) * 1.2) - 170,
      };
      circleNumbers.push({ value: circleNumbers.length, pos: pos });
    }
    if (circleNumbers.length > 60) break;
  }
}

function draw() {
  let currentHour = new Date().getHours();
  let currentMinute = new Date().getMinutes();
  let currentSecond = new Date().getSeconds();

  // calcolare rgb valori a base del tempo
  const hoursRgb = Math.floor((currentHour / 23) * 255);
  const minutesRgb = Math.floor((currentMinute / 59) * 255);
  const secondsRgb = Math.floor((currentSecond / 59) * 255);

  // calcolare luminanza dello sfondo
  const luminance =
    (0.2126 * hoursRgb + 0.7152 * minutesRgb + 0.0722 * secondsRgb) / 255;

  
  let backgroundColor;
  if (luminance > 0.5) {
    backgroundColor = color(255); 
  } else {
    backgroundColor = color(0); 
  }

  
  let strokeColor = color(255) - backgroundColor;

  // colore del testo massimo contrasto
  const textColor = luminance > 0.5 ? "#000000" : "#ffffff";


  background(255);

  
  fill(hoursRgb, minutesRgb, secondsRgb); 
  stroke(strokeColor); 
  strokeWeight(1.5); 
  triangle(
    triangleStartX,
    triangleStartY - 20,
    triangleStartX - triangleBase / 2 - 20,
    triangleStartY + triangleHeight,
    triangleStartX + triangleBase / 2 + 20,
    triangleStartY + triangleHeight
  );

  // disegno quadrato
  fill(hoursRgb, minutesRgb, secondsRgb); // colore basato al tempo
  stroke(strokeColor); // Set stroke color (complementare dello sfondo)
  strokeWeight(1.5); 
  rect(squareStartX, squareStartY, squareSize, squareSize);

  // diesgno cerchio
  fill(hoursRgb, minutesRgb, secondsRgb); // colore proporzionato al tempo
  stroke(strokeColor); // Set stroke color (complementare dello sfondo)
  strokeWeight(1.5); 
  ellipse(circleCenterX, circleCenterY, circleRadius * 2);

  // numeri dei minuti
  textSize(15); 
  fill(textColor); 
  noStroke(); 
  for (let num of triangleNumbers) {
    if (num.value !== currentMinute) {
      // saltare il minuto recente
      text(num.value, num.pos.x, num.pos.y);
    }
  }

  // numeri di quadrato 
  textSize(25); 
  fill(textColor); // colore del testo massimo contrasto
  noStroke(); 
  for (let num of squareNumbers) {
    if (num.value !== currentHour) {
      // saltare orario recente
      text(num.value, num.pos.x, num.pos.y);
    }
  }

  // numeri del cerchio
  textSize(15); 
  fill(textColor); 
  noStroke(); 
  for (let num of circleNumbers) {
    if (num.value !== currentSecond) {
      // Skip il secondo
      text(num.value, num.pos.x, num.pos.y);
    }
  }
}
