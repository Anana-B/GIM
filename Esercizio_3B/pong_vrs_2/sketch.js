let posizioneX, posizioneY;
let velX, velY;
let currentNumber = 0;
let r, g, b;

function setup() {
    createCanvas(windowWidth, windowHeight);

    posizioneX = width / 2;
    posizioneY = height / 2;

    velX = random(-10, 10);
    velY = random(-10, 10);

    changeColor(); // Initialize with a random color
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function changeColor() {
    r = random(255);
    g = random(255);
    b = random(255);
}

function draw() {
    posizioneX = posizioneX + velX;
    posizioneY = posizioneY + velY;

    if (posizioneX >= width || posizioneX < 0) {
        velX = -velX;
        currentNumber++;
        changeColor();
    }

    if (posizioneY >= height || posizioneY < 0) {
        velY = -velY;
        currentNumber++;
        changeColor();
    }

    background(200);

    noStroke();
    fill(r, g, b);
    textSize(80);
    textAlign(CENTER, CENTER);
    text(currentNumber, posizioneX, posizioneY);
}